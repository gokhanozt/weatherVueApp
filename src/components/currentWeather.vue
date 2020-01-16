<template>
    <div >
        <div class="weather-wrapper">
            <div class="city-container">
                <div class="city-boxes">

                    <select id="select1" v-model="selected" class="custom-select" v-on:change="onChange" >
                        <option value="none">City Name</option>
                        <option value="istanbul">İstanbul</option>
                        <option value="ankara">Ankara</option>
                        <option value="izmir">İzmir</option>
                    </select>
                    <span>Selected: {{selected}}</span>
                    <p></p>
                </div>
                <div class="city-boxes row " v-for="post of posts">
                    <div class="column column-1" >
                        <span>{{post.LocalObservationDateTime}} </span>
                        <span><img v-bind:src="'https://developer.accuweather.com/sites/default/files/0'+'weatherIcon'+'-s.png'" /> </span>
                        <span>{{post.Temperature.Metric.Value}} {{post.Temperature.Metric.Unit}}</span>
                        <span>{{post.WeatherText}}</span>
                    </div>
                    <div class="column column-2">
                        <span>Real Feel in Shade: {{post.RealFeelTemperatureShade.Metric.Value}} {{post.RealFeelTemperatureShade.Metric.Unit}}</span>
                        <span>Real Feel: {{post.RealFeelTemperature.Metric.Value}} {{post.RealFeelTemperature.Metric.Unit}}</span>
                    </div>
                </div>
                <div class="city-boxes row"v-for="post of posts">
                    <div class="column column-1">
                        <span>UV Index: {{post.UVIndex}} {{post.UVIndexText}}</span>
                        <span>Wind:{{post.Wind.Direction.English}} at {{post.Wind.Speed.Value}}</span>
                        <span>Wind Gusts:{{post.WindGust.Speed.Metric.Value}} {{post.WindGust.Speed.Metric.Unit}} </span>
                        <span>Humidity: {{post.RelativeHumidity}} %</span>
                    </div>
                    <div class="column column-2">
                        <span>Dew Point: {{post.DewPoint.Metric.Value}} {{post.DewPoint.Metric.Unit}}</span>
                        <span>Pressure: {{post.Pressure.Metric.Value}} {{post.Pressure.Metric.Unit}}</span>
                        <span>Cloud Cover: {{post.CloudCover}} %</span>
                        <span>Visibility: {{post.Visibility.Metric.Value}} {{post.Visibility.Metric.Unit}}</span>
                    </div>
                </div>
            </div>
            <div class="detailed-list">
                <p>5 Days forecast for : {{selected}}</p>
                <div class="weather-detail">
                    <div class="weather-chart"> CHART
                    </div>
                    <div class="weather-detail">
                        <table class="minimalistBlack">
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>Sunrise</th>
                                <th>Sunset</th>
                                <th>Min Temp</th>
                                <th>max Temp</th>
                            </tr>
                            </thead>

                            <tbody v-for="allDay of allDays">
                            <tr>
                                <td>1</td>
                                <td>cell2_1</td>
                                <td>cell3_1</td>
                                <td>cell4_1</td>
                                <td>cell5_1</td>
                            </tr>
                            <tr>
                                <td>cell1_2</td>
                                <td>cell2_2</td>
                                <td>cell3_2</td>
                                <td>cell4_2</td>
                                <td>cell5_2</td>
                            </tr>
                            <tr>
                                <td>cell1_3</td>
                                <td>cell2_3</td>
                                <td>cell3_3</td>
                                <td>cell4_3</td>
                                <td>cell5_3</td>
                            </tr>
                            <tr>
                                <td>cell1_4</td>
                                <td>cell2_4</td>
                                <td>cell3_4</td>
                                <td>cell4_4</td>
                                <td>cell5_4</td>
                            </tr>
                            <tr>
                                <td>cell1_5</td>
                                <td>cell2_5</td>
                                <td>cell3_5</td>
                                <td>cell4_5</td>
                                <td>cell5_5</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>

        <router-view></router-view>
    </div>

</template>
<script>
    "use strict";

    import axios from 'axios';

    let one =
        "https://raw.githubusercontent.com/ardatasci/frontend-recruitment-task/master/istanbulCurrentWeather.json";
    let two =
        "https://raw.githubusercontent.com/ardatasci/frontend-recruitment-task/master/ankara5DaysWeather.json";


    export default {
        data() {
            return {
                posts: [],
                errors: [],
                list:[],
                allDays:[],
                selected:''
            }
        },

        created() {
            axios.get(`https://raw.githubusercontent.com/ardatasci/frontend-recruitment-task/master/istanbulCurrentWeather.json`)
                .then(response => {
                    this.posts = response.data
                })
                .catch(e => {
                    this.errors.push(e)
                })
        },
        methods: {
            onChange: function (){
                var self = this;
                const requestOne = axios.get(one);
                const requestTwo = axios.get(two);
                console.log(self.posts);
                axios.get('https://raw.githubusercontent.com/ardatasci/frontend-recruitment-task/master/'+this.selected + 'CurrentWeather.json')
                    .then(function (response) {
                        self.posts = response.data;
                        console.log('before list');
                        console.log(self.posts);

                        console.log('after list');
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                axios
                    .all([requestOne, requestTwo])
                    .then(
                        axios.spread((...responses) => {
                            const responseOne = responses[0];
                            const responseTwo = responses[1];
                            this.allDays = responseTwo;
                            console.log(responseOne, responseTwo);
                        })
                    )
                    .catch(errors => {
                        // react on errors.
                        console.error(errors);
                    });
            }
        }
    }
</script>

<style scoped lang="scss">

    input, textarea, button {
        font-family: inherit; }


    .weather-wrapper {
        margin: 20px 50px;
    }

    .city-container {
        display: -webkit-box;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        padding: 20px 20px 40px 20px;
    }
    .city-container .city-boxes {
        padding: 10px 30px;
        border-right: 1px solid #c3073f;
    }
    .city-container .city-boxes:last-child {
        border-right: none;
    }
    .city-container .city-boxes select {
        border-radius: 4px;
        height: 30px; }

    .row {
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%; }

    .column {
        display: -webkit-box;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        flex-basis: 100%;
        -webkit-box-flex: 1;
        flex: 1; }

    .detailed-list p {
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #c3073f;
    }
    .weather-wrapper select{
        background-color: #fff;
        padding: 5px 10px;
        border: 1px solid #343a40;
        -webkit-appearance: menulist;
    }
    .weather-wrapper span{
        padding: 5px;
    }
    table.minimalistBlack {
        border: 3px solid #000000;
        width: 100%;
        text-align: left;
        border-collapse: collapse;
    }
    table.minimalistBlack td, table.minimalistBlack th {
        border: 1px solid #000000;
        padding: 5px 4px;
    }
    table.minimalistBlack tbody td {
        font-size: 13px;
    }
    table.minimalistBlack thead {
        background: #CFCFCF;
        background: -moz-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
        background: -webkit-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
        background: linear-gradient(to bottom, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
        border-bottom: 3px solid #000000;
    }
    table.minimalistBlack thead th {
        font-size: 15px;
        font-weight: bold;
        color: #000000;
        text-align: left;
    }
    table.minimalistBlack tfoot {
        font-size: 14px;
        font-weight: bold;
        color: #000000;
        border-top: 3px solid #000000;
    }
    table.minimalistBlack tfoot td {
        font-size: 14px;
    }
    .weather-detail{
        display: flex;
        justify-content: space-between;
    }
    .weather-chart{
      min-width: 50%
    }

</style>
