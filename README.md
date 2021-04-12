## 说明

测量打点时间的小工具，可用于辅助性能测试

## Installation

``` 

npm install simple-measure
```

OR

``` 

yarn add simple-measure
```

## Usage

``` javascript
import {
    Measure
} from 'simple-measure';

Measure.record('first record');
setTimeout(() => {
    Measure.record('second record');
}, 1000);

setTimeout(() => {
    Measure.printRecord('relativeToPrev');
    Measure.printRecord('relativeToFirst');
    Measure.resetRecord();
}, 1500);
```

<br>
<br>

## API docs

<br>
<br>

> ### Message. record(stepName: string, stepInfo?: any, symbol: string = 'default')

调用此方法记录当前时间和信息。stepName：该步骤的名称。stepInfo：预留的变量，暂时没用。symbol：命名空间，打印时间线时，只打印指定命名空间的记录点。

> ### Message. resetRecord(symbol: string = 'default')

清空指定命名空间的所有记录。

> ### Message. printRecord(format: RecordFormat = 'default', symbol: string = 'default')

打印指定命名空间的时间线
<br>

| RecordFormat       |                                                         description |
|-----------------|--------------------------------------------------------------------:|
| `default` |   打印hh:mm:ss时间线   |
| `relativeToPrev` |  打印相对于上一个打点的时间线 |
| `relativeToFirst` | 打印相对于第一个打点的时间线 |

> ### Gesture. resume()

resueme all gesture listener
