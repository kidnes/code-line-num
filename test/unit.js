import count from '../src/index';
// var count = require('../src/index.js');

describe('统计代码行', () => {
    it('统计JS文件', () => {
        var info = count.count(`var t = 1;
            //single line
            /*
             * mutile line
             */

            // comment line

            t = 2; /* single line */
        `);
        expect(info.totalLine).toBe(9);
        expect(info.blackLine).toBe(2);
        expect(info.commentLine).toBe(6);
        expect(info.codeLine).toBe(2);
    });

    it('统计vue文件', () => {
        var info = count.count(`<template>
                <div class="wrap">
                    <div class="navbar">
                        <img class="logo" src="./assets/logo.png">
                        <!-- <nav class="collapse">
                            <a href="#/home">Home</a>
                            <a href="#/demo">Demo</a>
                            <a href="#/document">Document</a>
                        </nav> -->
                    </div>
                    <router-view></router-view>
                </div>
            </template>

            <script>

            export default {
                name: 'app',
                created () {
                },
                /* data () {
                 *   return {
                 *   }
                } */
            }
            </script>

            <style lang="less">
            body {
                font-family: Helvetica, sans-serif;
                margin: 0;
                // background-color: #fafafa;
            }
            </style>
        `);
        expect(info.totalLine).toBe(34);
        expect(info.blackLine).toBe(3);
        expect(info.commentLine).toBe(10);
        expect(info.codeLine).toBe(21);
    });
});
