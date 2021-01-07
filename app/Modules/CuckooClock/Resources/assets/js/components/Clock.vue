<template>
    <div>
        <div class="clock">
            <div @click="playInterval(intervalVal)">
                <div class="text-7xl">{{ dateTime | moment("MMM Do YY") }}</div>
                <div class="interval mt-6">
                    <span class="eng">{{ currentInterval.eng }}</span> | <span
                    class="rus">{{ currentInterval.rus }}</span>
                </div>
                <div class="text-9xl mt-2">{{ dateTime | moment("hh:mm:ss") }}</div>
            </div>
            <div class="mt-5">
                <div class="grid grid-cols-12 gap-4">
                    <div v-for="interval in intervals" @click="playInterval(interval.int)">
                        <span :class="">{{ interval.eng }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <input type="checkbox" v-model="muteSound" @click="changeSoundMode" checked="muteSound" id="scales"><label
            for="scales">Mute</label>
            <div class="text-center">
                <range-slider class="slider" min="0" max="1" step="0.1" v-model="volume"></range-slider>
            </div>
        </div>

    </div>
</template>
<script>

    import RangeSlider from 'vue-range-slider';
    import 'vue-range-slider/dist/vue-range-slider.css';
    import Cookies from "coockies";
    import moment from 'moment';

    export default {
        props: [],
        data() {
            return {
                tonica: 0,
                dateTime: new Date(),
                muteSound: Cookies.get('muteSound', 0), // convert string to bool
                volume: Cookies.get('volume', 0.5),
                currentInterval: '',
                intervalVal: 0,
                intervals: [
                    {rus: 'Чистая прима', eng: 'Unison', int: '0'},
                    {rus: 'Малая секунда', eng: 'Minor Second', int: '1'},
                    {rus: 'Большая секунда', eng: 'Major Second', int: '2'},
                    {rus: 'Малая терция', eng: 'Minor Third', int: '3'},
                    {rus: 'Большая терция', eng: 'Major Third', int: '4'},
                    {rus: 'Чистая кварта', eng: 'Perfect Fourth', int: '5'},
                    {rus: 'Увеличенная кварта или уменьшенная квинта',eng: 'Augmented Fourth / Diminished Fifth',int: '6'},
                    {rus: 'Чистая квинта', eng: 'Perfect Fifth', int: '7'},
                    {rus: 'Малая секста', eng: 'Minor Sixth', int: '8'},
                    {rus: 'Большая секста', eng: 'Major Sixth', int: '9'},
                    {rus: 'Малая септима', eng: 'Minor Seventh', int: '10'},
                    {rus: 'Большая септима', eng: 'Major Seventh', int: '11'},
                    {rus: 'Чистая октава', eng: 'Octave', int: '12'},
                    {rus: 'Малая нона', eng: 'Minor Ninth', int: '13'},
                    {rus: 'Большая нона', eng: 'Major Ninth', int: '14'},
                    {rus: 'Малая децима', eng: 'Minor Tenth', int: '15'},
                    {rus: 'Большая децима', eng: 'Major Tenth', int: '16',},
                    {rus: 'Чистая ундецима', eng: 'Perfect Eleventh', int: '17'},
                    {rus: 'Увеличенная ундецима или уменьшенная дуодецима',eng: 'Augmented Eleventh / Diminished Twelfth',int: '18'},
                    {rus: 'Чистая дуодецима', eng: 'Perfect Twelfth', int: '19'},
                    {rus: 'Малая терцдецима', eng: 'Minor Thirteenth', int: '20'},
                    {rus: 'Большая терцдецима', eng: 'Major Thirteenth', int: '21'},
                    {rus: 'Малая квартдецима', eng: 'Minor Fourteenth', int: '22'},
                    {rus: 'Большая квартдецима', eng: 'Major Fourteenth', int: '23'},
                ],
            }
        },
        components: {
            RangeSlider,
        },
        mounted() {
            this.tick();
        },
        methods: {

            /**
             * Update clock every second
             */
            tick() {
                setInterval(() => {
                    this.dateTime = new Date();
                }, 1000);
            },

            /**
             * Mute / Unmute Hourly alarm
             */
            changeSoundMode() {
                this.muteSound = !this.muteSound;
            },

            playInterval(noteTwo) {
                let noteOnePath = "/sounds/notes/note-" + (this.tonica + 1) + ".mp3";
                let noteTwoPath = "/sounds/notes/note-" + (this.tonica + parseInt(noteTwo) + 1) + ".mp3";

                this._playSound(noteOnePath);
                this._playSound(noteTwoPath);
            },

            /**
             * Play Sound
             *
             * @private
             */
            _playSound(soundPath) {
                let audio = new Audio(soundPath);
                audio.volume = this.volume;
                audio.muted = this.muteSound;
                audio.play();
            },
        },
        computed: {},
        watch: {
            dateTime(dateTime) {
                this.intervalVal = moment().format('h');
                this.currentInterval = this.intervals[this.intervalVal];

                if (dateTime.getMinutes() === 0 && dateTime.getSeconds() === 0) {
                    this.playInterval(this.intervalVal);
                }
            },
            muteSound(mode) {
                Cookies.set('muteSound', mode);
            },
            volume(vol) {
                Cookies.set('volume', vol);
            },
        }
    }
</script>
<style>
    .slider {
        width: 200px;
    }

    .clock {
        top: 50%;
        position: absolute;
        margin-top: -250px;
        width: 100%;
        text-align: center !important;
        cursor: help;
    }
</style>
