<h1 align="center">koa78-Upinfo</h1>
<div align="center">

English| [简体中文](./README.cn.md) 

**koa78-Upinfo** is a highly productive Koa framework.

[![License](https://img.shields.io/badge/license-Apache%202-green.svg)](https://www.apache.org/licenses/LICENSE-2.0)
[![Test Status](https://github.com/www778878net/koa78-UpInfo/actions/workflows/BuildandTest.yml/badge.svg?branch=main)](https://github.com/www778878net/koa78-UpInfo/actions/workflows/BuildandTest.yml)
[![QQ Group](https://img.shields.io/badge/QQ%20Group-323397913-blue.svg?style=flat-square&color=12b7f5&logo=qq)](https://qm.qq.com/cgi-bin/qm/qr?k=it9gUUVdBEDWiTOH21NsoRHAbE9IAzAO&jump_from=webapi&authKey=KQwSXEPwpAlzAFvanFURm0Foec9G9Dak0DmThWCexhqUFbWzlGjAFC7t0jrjdKdL)

</div>

## API Documentation: [http://www.778878.net/docs/#/koa78-Upinfo/](http://www.778878.net/docs/#/koa78-Upinfo/)
## Feedback QQ Group (Click to join): [323397913](https://qm.qq.com/cgi-bin/qm/qr?k=it9gUUVdBEDWiTOH21NsoRHAbE9IAzAO&jump_from=webapi&authKey=KQwSXEPwpAlzAFvanFURm0Foec9G9Dak0DmThWCexhqUFbWzlGjAFC7t0jrjdKdL)

## Background
1. Eighteen years of ERP development experience, ten years of cloud development experience, fifteen years of stock and futures investment experience, and ten years of investment analysis platform development experience.
2. Not highly technical but understands business and excels at solving practical problems in production and operations.
3. Gradually open-sourcing projects that have been optimized over many years and are continuously running stably.

## Introduction

1. Wraps Koa to reduce learning overhead.
2. Stable: has run for years with thousands of concurrent requests handled by two single-core 1GB machines.
3. Fast development: a few lines of code can handle common APIs like CRUD and batch creation.
4. Efficient: comes with a comprehensive low-code front-end and back-end framework; one backend developer can easily support four or more frontend developers.
5. Easy to extend: business tables correspond to data tables; each directory represents a small set of features, and each file is a data table.
6. Adaptable: runs simultaneously on Alibaba Cloud and Tencent Cloud.
7. Easy debugging: can be configured to track calls for specific users, tables, or directories.
8. Easy to learn: a simple ten-line codebase makes it hard not to understand.
9. Easy maintenance: includes comprehensive API call count and timing statistics, as well as error reporting via WeChat.
10. Rapid updates: the primary operational projects use this framework, ensuring timely bug fixes and new feature implementations.
11. Easy refactoring: each directory is a small system, with each version having its own path; new and old APIs can coexist long-term.
12. SAAS: supports account or user data isolation.

## Screenshots

> ![Backend Service](https://github.com/www778878net/node-date78/blob/main/assets/pic/services.jpeg)
> ![Backend Code Example](https://github.com/www778878net/node-date78/blob/main/assets/pic/nodejs.png)
> ![Frontend Code Example](https://github.com/www778878net/node-date78/blob/main/assets/pic/js.png)


## Applicable Platforms

**Suitable for `nodejs ts` projects**

## Installation

See the API documentation for details.

## Properties

See the API documentation for details.

## Methods

See the API documentation for details.

## Demo

```nodejs
// For more examples, see the documentation link.
let up = new Upinfo(null);
let newid = up.getNewid();    