angular.module('ngUtilsModule', [])
.factory("ngDataModel",
    function (clearAlertWhenClickBody, httpServer, URLAPI, $compile, $q) {
        var commonStorage = {
            hasExist: {},
            countDown: {}
        };
        return {
                     
            /**
             * @multiHead:  ::基础样本必须包含以下3个字段的树形
             *              ::[{ key:"x",value:"x",children:[{}...]}...]
             * @maxLayer:   ::指定表头最大行数
             * @return:     ::[[{},{}]...];
             * */
             multiHeadTransform: function (multiHeadTree, maxLayer, renderEntries) {

                var result = [];

                loop(null, multiHeadTree, maxLayer, 0, 0);

                function loop(parent, stepOriginData, maxLayer, stepLayer) {

                    // 默认初始层级为0
                    var curLayer = stepLayer === undefined ? 0 : stepLayer;

                    stepOriginData.forEach(function (stepOriginDataItem) {
                        if (!result[curLayer]) result[curLayer] = [];

                        // 单元格数据模型
                        var modeCell = {
                            colSpan: 1,// if(hasChildren) children.length;
                            rowSpan: 1,// if(noChildren) maxLayer - level;
                            key: stepOriginDataItem.key,
                            value: stepOriginDataItem.value,
                            level: curLayer,
                            parentKey: parent ? parent.key : null,
                            isRender: true
                        };

                        result[curLayer].push(modeCell);

                        if (stepOriginDataItem.children && stepOriginDataItem.children.length > 0) {

                            // 如果有子集，就以子集的个数来标记自身的colSpan值
                            // （只是临时标记逐层的关系，因为在当前递归中无法确定第一行和第三行的关系）
                            // rowSpan就默认为1，不用修改
                            modeCell.colSpan = stepOriginDataItem.children.length;

                            loop(stepOriginDataItem, stepOriginDataItem.children, maxLayer, curLayer + 1);
                        } else {

                            // 如果没有子集，就以最大行数减去当前递归的层数来标记自身rowSpan值（这个逻辑看视图会比较清晰）
                            // colSpan默认为1，不用修改
                            modeCell.rowSpan = maxLayer - curLayer;
                        }
                    });
                }

                var len = result.length;
                var colMarkMap = {};

                // 从下往上遍历，根据parentKey的关系，计算汇总每层的最终colSpan值
                // 最终记录到对应的map
                while (len--) {
                    var peerRow = result[len];
                    peerRow.forEach(function (cellItem) {
                        if (colMarkMap[cellItem.parentKey] === undefined) colMarkMap[cellItem.parentKey] = 0;
                        colMarkMap[cellItem.parentKey] += cellItem.colSpan;
                    });
                }

                // 最后再匹配map的记录
                var len1 = result.length;
                while (len1--) {
                    var peerRow1 = result[len1];
                    peerRow1.forEach(function (cellItem) {
                        cellItem.colSpan = colMarkMap[cellItem.key] ? colMarkMap[cellItem.key] : 1;
                    });
                }

                if(renderEntries){
                    var renderFields = this.isArray(renderEntries) ? renderEntries : this.getObjectKeys(renderEntries);
                    var parentRenderFields = [];
                    renderFields.forEach(function (field) {
                        result.forEach(function(peerRow){
                            peerRow.forEach(function(cellItem){
                                if(cellItem.key === field){
                                    cellItem.isRender = true;
                                    if(parentRenderFields.indexOf(cellItem.parentKey) === -1)
                                        parentRenderFields.push(cellItem.parentKey);
                                }
                            });
                        })
                    });

                    parentRenderFields.forEach(function (field) {
                        result.forEach(function(peerRow){
                            peerRow.forEach(function(cellItem){
                                if(cellItem.key === field){
                                    cellItem.isRender = true;
                                }
                            });
                        })
                    });

                    result.forEach(function(peerRow){
                        peerRow.forEach(function(cellItem,cellIndex){
                            if(!cellItem.isRender){
                                peerRow.splice(cellIndex,1);
                            }
                        });
                    })
                }

                return result;
            }

            , getRenderFieldFromMultiHeadEntries: function (multiHeadTree) {
                var keyArr = [];
                var valueArr = [];

                loop(multiHeadTree, keyArr, valueArr);

                function loop(curLevelArray, keyArr, valueArr) {
                    curLevelArray.forEach(function (curLevelItem, topLevelIndex) {
                        if (curLevelItem.children && curLevelItem.children.length) {
                            loop(curLevelItem.children, keyArr, valueArr);
                        } else {
                            keyArr.push(curLevelItem.key);
                            valueArr.push(curLevelItem.value);
                        }
                    });
                }

                // function spillMap(keyArr,valueArr){
                //     var result = {};
                //     keyArr.forEach(function(key,index){
                //         result[key] = valueArr[index];
                //     });
                //     return result;
                // }

                return keyArr;
            }

            /**
             * @originData(*必填)[Array|Object]   ::输入数据,模型：[{a:"",b:""},{a:"",b:""}] or {a:{},b:{}}
             * @renderField(*必填)[Object|Array]  ::实体字段，这里的有的字段，输出数据时，isRender属性都会默认为true
             * @rowMark(*必填)[String|Number]     ::每一行的标记，会根据这里提供的字段名所获取到的值来作为标记
             * @isMergeCell[Boolean]             ::是否对所有列的单元格进行合并,默认不合并
             * @disableMergedCols[Array(String)] ::提供列的合并例外，以字段名来标记
             * @reverseSortedCols[Array(String)] ::提供列的升序例外(例外为降序)，以字段名来标记
             * @routerBlackCols[Array(String)]   ::提供列的路由跳转例外，以字段名来标记
             * @hiddenCols[Array(String)]        ::提供列的渲染例外，只要声明在这里，最后输出数据时，isRender属性都设置为false
             * @return[Array]
             * */
            , multiBodyTransform: function (params) {

                var originData = params.originData;
                var renderField = params.renderField;
                var rowMark = params.rowMark;
                var isMergeCell = params.isMergeCell;

                var disableMergedCols = params.disableMergedCols ? params.disableMergedCols : [];
                var reverseSortedCols = params.reverseSortedCols ? params.reverseSortedCols : [];
                var routerBlackCols = params.routerBlackCols ? params.routerBlackCols : [];
                var hiddenCols = params.hiddenCols ? params.hiddenCols : [];
                var insertIconCols = params.insertIconCols ? params.insertIconCols : [];
                var fakedRateCols = params.fakedRateCols ? params.fakedRateCols : [];

                var cellItemModel = {
                    value: "", // 最终的视图
                    columnKey: "", // 每一列的标记字段
                    rowKey: "", // 每一行的标记字段，如果用户不进行定制，就默认使用原数据的数组下标
                    colSequencing: 0, //列排序下标
                    rowSequencing: 0, //行排序下标
                    isRate: false,// 当前的值是否是百分比的值，
                                  // 百分比的值--虽然业务逻辑上它还是数值，
                                  // 但是处理逻辑上它是个字符串，最后处理的时候要加上百分号
                    isFakedRate: false, // 这个值用于享受rate的判断条件，但是最终显示的时候不带%号
                    isRender: true, // 当前单元格是否渲染,默认可渲染
                    isNumber: false, // 判断纯数值
                    isRouting: true, // 当前单元格是否有跳转行为,默认可跳转
                    isInsertIcon: false // 用于允许插入额外的小图标在当前单元格
                };

                // 过滤一下渲染字段类型，最终取用的是key数组
                renderField = this.isArray(renderField) ? renderField : this.getObjectKeys(renderField);

                function getAllRowView() {
                    var viewOriginDataArray = [];

                    Object.keys(originData).forEach(function (originDataKey, rowIndex) {
                        var newRowArray = [];
                        var peerRow = originData[originDataKey];
                        // 循环单行对象

                        renderField.forEach(function (renderKey,totalRowSequencing) {
                            newRowArray.push(createCellItem(peerRow, renderKey, rowIndex, totalRowSequencing));
                        });

                        viewOriginDataArray.push(_.sortBy(newRowArray, "rowSequencing"));
                    });

                    return viewOriginDataArray;
                }

                function createCellItem(peerRow, renderKey, rowIndex, totalRowSequencing) {

                    // 过滤无意义数据
                    peerRow[renderKey] = peerRow[renderKey] === null ? "" : peerRow[renderKey];
                    peerRow[renderKey] = peerRow[renderKey] === undefined ? "" : peerRow[renderKey];

                    // 根据提供的字段实体来裁剪最终数据
                    var newValue = peerRow[renderKey];
                    var isRate = false;
                    var isInsertIcon = false;
                    var isFakedRate = false;
                    var isRouting = true;
                    var isNumber = false;
                    var isRender = true;

                    // 判断如果值有%，就过滤掉,设置isRate值
                    // 在ng-bind的时候，判断isRate字段为true，就加%，显示
                    if (newValue.toString().indexOf("%") >= 0) {
                        newValue = parseFloat(newValue.substring(0, newValue.length - 1));
                        isRate = true;
                    }

                    if (insertIconCols.indexOf(renderKey) > -1) {
                        isInsertIcon = true;
                    }

                    if (fakedRateCols.indexOf(renderKey) > -1) {
                        isFakedRate = true;
                    }

                    // 如果每一项的数据结果是0，或者被存为黑名单，就不需要路由跳转
                    if (newValue === 0 || routerBlackCols.indexOf(renderKey) > -1) {
                        isRouting = false;
                    }

                    // 把字串类型的数字转成数字类型，方便ng排序
                    if (!isNaN(newValue)) {
                        isNumber = true;
                    }

                    // 是否隐藏元素
                    if (hiddenCols.indexOf(renderKey) > -1) {
                        isRender = false;
                    }

                    var cloneModel = JSON.parse(JSON.stringify(cellItemModel));

                    cloneModel.value = newValue;
                    cloneModel.isRate = isRate;
                    cloneModel.colSequencing = 0; // 这个值必须对每一列进行排序之后才能得到
                    cloneModel.rowSequencing = totalRowSequencing;
                    cloneModel.columnKey = renderKey;
                    cloneModel.rowKey = peerRow[rowMark] || rowIndex;
                    cloneModel.isRender = isRender;
                    cloneModel.isRouting = isRouting;
                    cloneModel.isInsertIcon = isInsertIcon;
                    cloneModel.isFakedRate = isFakedRate;
                    cloneModel.isNumber = isNumber;

                    return cloneModel;
                }

                function getAllColView(allRowView) {
                    // 首先循环一遍，把相同的项存成一个数组，统一key值
                    var allColView = {};
                    allRowView.forEach(function (peerRow, colIndex) {
                        peerRow.forEach(function (singleItem, rowIndex) {

                            var key = singleItem.columnKey;
                            if (allColView[key]) {
                                allColView[key].push(singleItem);
                            }
                            else {
                                allColView[key] = [];
                                allColView[key].push(singleItem);
                            }

                        });
                    });

                    return allColView;
                }

                function sortingColView(allColView, reverseSortedCols) {
                    // 遍历一遍allColView，对列进行排序，添加标记
                    Object.keys(allColView).forEach(function (key, index) {
                        var curCol = allColView[key];

                        // 根据每一列的值先排个序
                        curCol = _.sortBy(curCol, "value");

                        var objLen = curCol.length;
                        var iterats = objLen;
                        while (iterats--) {

                            if (reverseSortedCols.indexOf(key) > -1) {
                                curCol[iterats].colSequencing = iterats;
                            } else {
                                // 添加列序号标记
                                curCol[iterats].colSequencing = objLen - iterats - 1;
                            }

                        }
                    });
                    return allColView;
                }

                function mergeRowSpan(allColView) {

                    Object.keys(allColView).forEach(function (colKey) {

                        var countDupStartIndex = 0;
                        var countDupSum = 1; // 默认行数

                        var curColView = allColView[colKey];
                        curColView.forEach(function (colCellItem, colCellIndex) {

                            // 根据定制，来取消合并的列
                            if (disableMergedCols.indexOf(colCellItem.columnKey) > -1) {
                                colCellItem.rowSpan = 1;
                                colCellItem.colSpan = 1;
                                colCellItem.relativeRowKey = colCellItem.rowKey;
                                return;
                            }

                            var nextItem = curColView[colCellIndex + 1];

                            // 比对当前和下一项的值,
                            // 如果相同，就把 countDupSum 加1，最后赋值给重复的起始位的单元格
                            if (nextItem && colCellItem.value === nextItem.value) {
                                countDupSum++;
                                nextItem.isRender = false;
                                nextItem.rowSpan = 1;
                                nextItem.colSpan = 1;
                                nextItem.relativeRowKey = curColView[countDupStartIndex].rowKey;

                            } else {
                                curColView[countDupStartIndex].relativeRowKey = curColView[countDupStartIndex].rowKey;
                                curColView[countDupStartIndex].rowSpan = countDupSum;
                                curColView[countDupStartIndex].colSpan = 1;
                                countDupSum = 1;
                                countDupStartIndex = colCellIndex + 1; // 把起始下标往下挪一位
                            }

                        });
                    });

                    return allColView;
                }

                function colAndRowInteraction(allRowView, allColView) {
                    // 循环比对，然后把对应的修改项插回展示数组
                    var i = allRowView.length;
                    while (i--) {   // 循环行
                        var rowItem = allRowView[i];
                        Object.keys(allColView).forEach(function (key, rowIndex) {
                            var colItem = allColView[key];
                            var colIndex = colItem.length;

                            while (colIndex--) { // 循环列

                                // 如果colName和rowName这二维值相同，就代表可以覆盖原项
                                if (colItem[colIndex].columnKey === rowItem[rowIndex].columnKey
                                    && colItem[colIndex].rowKey === rowItem[rowIndex].rowKey) {
                                    rowItem[rowIndex] = colItem[colIndex];
                                }

                            }

                        });
                    }

                    return allRowView;
                }

                var baseRowEntries = getAllRowView();
                var baseColEntries = getAllColView(baseRowEntries);
                var colEntriesAfterSorted = sortingColView(baseColEntries, reverseSortedCols);
                var colEntriesAfterMergeRowSpan = isMergeCell ? mergeRowSpan(colEntriesAfterSorted) : colEntriesAfterSorted;

                return colAndRowInteraction(baseRowEntries, colEntriesAfterMergeRowSpan);
            }

            , multiBodyTransformRollback: function (dataView) {
                var result = null;
                if(this.isArray(dataView[0])){
                    result = [];
                    dataView.forEach(function (peerRow) {
                        var result_Row = {};
                        peerRow.forEach(function (cellItem) {
                            result_Row[cellItem.columnKey] = cellItem.value;
                        });
                        result.push(result_Row);
                    });
                }
                else if(this.isObject(dataView[0])){
                    result = {};
                    dataView.forEach(function (cellItem) {
                        result[cellItem.columnKey] = cellItem.value;
                    });
                }
                return result;
            }

            , buildRandomData: function (dataModel, rows, fixedField) {

                rows = rows ? rows : (suffix(20) + 1);
                fixedField = fixedField ? fixedField : "index";

                var result = [];
                var zhCode = "7684_4e00_4e86_662f_6211_4e0d_5728_4eba_4eec_6709_6765_4ed6_8fd9_4e0a_7740_4e2a_5730_5230_5927_91cc_8bf4_5c31_53bb_5b50_5f97_4e5f_548c_90a3_8981_4e0b_770b_5929_65f6_8fc7_51fa_5c0f_4e48_8d77_4f60_90fd_628a_597d_8fd8_591a_6ca1_4e3a_53c8_53ef_5bb6_5b66_53ea_4ee5_4e3b_4f1a_6837_5e74_60f3_751f_540c_8001_4e2d_5341_4ece_81ea_9762_524d_5934_9053_5b83_540e_7136_8d70_5f88_50cf_89c1_4e24_7528_5979_56fd_52a8_8fdb_6210_56de_4ec0_8fb9_4f5c_5bf9_5f00_800c_5df1_4e9b_73b0_5c71_6c11_5019_7ecf_53d1_5de5_5411_4e8b_547d_7ed9_957f_6c34_51e0_4e49_4e09_58f0_4e8e_9ad8_624b_77e5_7406_773c_5fd7_70b9_5fc3_6218_4e8c_95ee_4f46_8eab_65b9_5b9e_5403_505a_53eb_5f53_4f4f_542c_9769_6253_5462_771f_5168_624d_56db_5df2_6240_654c_4e4b_6700_5149_4ea7_60c5_8def_5206_603b_6761_767d_8bdd_4e1c_5e2d_6b21_4eb2_5982_88ab_82b1_53e3_653e_513f_5e38_6c14_4e94_7b2c_4f7f_5199_519b_5427_6587_8fd0_518d_679c_600e_5b9a_8bb8_5feb_660e_884c_56e0_522b_98de_5916_6811_7269_6d3b_90e8_95e8_65e0_5f80_8239_671b_65b0_5e26_961f_5148_529b_5b8c_5374_7ad9_4ee3_5458_673a_66f4_4e5d_60a8_6bcf_98ce_7ea7_8ddf_7b11_554a_5b69_4e07_5c11_76f4_610f_591c_6bd4_9636_8fde_8f66_91cd_4fbf_6597_9a6c_54ea_5316_592a_6307_53d8_793e_4f3c_58eb_8005_5e72_77f3_6ee1_65e5_51b3_767e_539f_62ff_7fa4_7a76_5404_516d_672c_601d_89e3_7acb_6cb3_6751_516b_96be_65e9_8bba_5417_6839_5171_8ba9_76f8_7814_4eca_5176_4e66_5750_63a5_5e94_5173_4fe1_89c9_6b65_53cd_5904_8bb0_5c06_5343_627e_4e89_9886_6216_5e08_7ed3_5757_8dd1_8c01_8349_8d8a_5b57_52a0_811a_7d27_7231_7b49_4e60_9635_6015_6708_9752_534a_706b_6cd5_9898_5efa_8d76_4f4d_5531_6d77_4e03_5973_4efb_4ef6_611f_51c6_5f20_56e2_5c4b_79bb_8272_8138_7247_79d1_5012_775b_5229_4e16_521a_4e14_7531_9001_5207_661f_5bfc_665a_8868_591f_6574_8ba4_54cd_96ea_6d41_672a_573a_8be5_5e76_5e95_6df1_523b_5e73_4f1f_5fd9_63d0_786e_8fd1_4eae_8f7b_8bb2_519c_53e4_9ed1_544a_754c_62c9_540d_5440_571f_6e05_9633_7167_529e_53f2_6539_5386_8f6c_753b_9020_5634_6b64_6cbb_5317_5fc5_670d_96e8_7a7f_5185_8bc6_9a8c_4f20_4e1a_83dc_722c_7761_5174_5f62_91cf_54b1_89c2_82e6_4f53_4f17_901a_51b2_5408_7834_53cb_5ea6_672f_996d_516c_65c1_623f_6781_5357_67aa_8bfb_6c99_5c81_7ebf_91ce_575a_7a7a_6536_7b97_81f3_653f_57ce_52b3_843d_94b1_7279_56f4_5f1f_80dc_6559_70ed_5c55_5305_6b4c_7c7b_6e10_5f3a_6570_4e61_547c_6027_97f3_7b54_54e5_9645_65e7_795e_5ea7_7ae0_5e2e_5566_53d7_7cfb_4ee4_8df3_975e_4f55_725b_53d6_5165_5cb8_6562_6389_5ffd_79cd_88c5_9876_6025_6797_505c_606f_53e5_533a_8863_822c_62a5_53f6_538b_6162_53d4_80cc_7ec6";
                var letterCode = "41_42_43_44_45_46_47_48_49_4a_4b_4c_4d_4e_4f_50_51_52_53_54_55_56_57_58_59_5a";

                var zhCodeArray = zhCode.split("_");
                var letterCodeArray = letterCode.split("_");

                var eventMap = {
                    EN: createEN //创建随机英文序列，格式：CSDN-XXXX
                    , CN: createCN //创建随机5个中文，格式：XXXXX
                    , NAME: createName //创建随机中文名字，格式：XXX
                    , DATE: createDate //创建随机日期，格式：XXXX-XX-XX
                    , RATE: createRate //创建随机概率数，格式：XX%
                    , DESC: createDescription //创建描述语句，格式：XXXXX，XXX，XXXXX
                    , SERIAL: createSerial //创建随机编号序列，格式：PMS-0000XXXX
                    , NUMBER: createNumberOnBit //创建随机4位数字，格式：XXXX
                    , REGEX: createRandomElementByRegex //根据提供的正则，取其中的随机元素
                };

                var fieldEntries = dataModel instanceof Array ? dataModel[0] : dataModel;
                while (rows--) {
                    var rowMode = {};
                    Object.keys(fieldEntries).forEach(function (fieldKey, index) {
                        var dataType = fieldEntries[fieldKey];

                        // 如果判断字符被[]包裹，就当作正则解析出一个随机元素
                        if (dataType.indexOf("[") === 0 && dataType.indexOf("]") === dataType.length - 1) {
                            return rowMode[fieldKey] = eventMap["REGEX"](dataType)
                        }

                        // 一般来说，选择一列固定的话，逐行添加下标
                        if (fieldKey === fixedField) {
                            rowMode[fieldKey] = result.length;
                        } else {
                            console.log(dataType);
                            var eventFn = eventMap[dataType] || eventMap["CN"];
                            rowMode[fieldKey] = eventFn();
                        }
                    });

                    result.push(rowMode);
                }

                return result;

                function createSerial() {
                    return "PMS" + "_" + "0000" + createNumberOnBit(4);
                }

                function createCN(max) {
                    max = max ? max : 5;
                    return createAPhrase(zhCodeArray, max);
                }

                function createRandomElementByRegex(regex) {
                    // regex类型为 [A|B|C]
                    var string = regex.substr(1, regex.length - 2);
                    var collection = string.split("|");
                    return collection[suffix(collection.length)];
                }

                function createDescription(phraseSum) {
                    console.log("dsds");
                    phraseSum = phraseSum ? phraseSum : (suffix(3) + 1);
                    var result = "";
                    var phraseBreak = "，";
                    while (phraseSum--) {
                        result += createAPhrase(zhCodeArray, 10) + phraseBreak;
                    }
                    return result;
                }

                function createEN() {
                    return "CSDN" + "-" + createAPhrase(letterCodeArray, 4);
                }

                function createDate() {
                    var nowDate = new Date();
                    var yy = nowDate.getFullYear();
                    // var mm = nowDate.getMonth() + 1;
                    // var dd = nowDate.getDay();
                    return yy + "-" + createMon(12) + "-" + createDay(30);

                    function createMon(limit) {
                        var result = (suffix(limit - 1) + 1).toString();
                        return result.length === 1 ? "0" + result : result;
                    }

                    function createDay(limit) {
                        var result = (suffix(limit - 1) + 1).toString();
                        return result.length === 1 ? "0" + result : result;
                    }

                }

                function createRate() {
                    return createNumberOnBit(2) + "%";
                }

                function createName() {
                    var firstName = "赵-钱-孙-李-周-吴-郑-王-蒋-沈-韩-杨-白-梁-容-荣-陈-张-黄-何-杜-姜-冯-郭-刘-曾-孔-王-顾-欧阳-慕容-诸葛-令狐-公孙-司马";
                    var lastName = createAPhrase(zhCodeArray, 2);
                    var firstNameArr = firstName.split("-");
                    return firstNameArr[suffix(firstNameArr.length)] + lastName;
                }

                function createNumberOnBit(limit) {
                    var result = "";
                    limit = limit ? limit : 4;
                    while (limit--) {
                        result += Math.floor(Math.random() * 10).toString();
                    }
                    return result;
                }

                function createAPhrase(_unicodeMap, len) {
                    len = len ? len : suffix(3) + 1;
                    var phrase = "";
                    while (len--) {
                        phrase += spillAWord(_unicodeMap);
                    }

                    return phrase;
                }

                function spillAWord(_unicodeMap) {
                    var wordCode = suffix(_unicodeMap.length);
                    return String.fromCharCode("0x" + _unicodeMap[wordCode]);
                }

                function suffix(max) {
                    max = max ? max : 10000;
                    return Math.floor(Math.random() * max);
                }
            }

            , sortedByModel:function(originData,model){
                var result = null;
                if(this.isObject(model)){
                    model = this.getObjectKeys(model);
                }
                if(this.isArray(originData)){
                    result = [];
                    originData.forEach(function(originDataItem){
                        var singleModel = {};
                        model.forEach(function (modelItem) {
                            Object.keys(originDataItem).forEach(function (key) {
                                if(modelItem === key){
                                    singleModel[modelItem] = originDataItem[key];
                                }
                            })
                        });
                        result.push(singleModel);
                    });
                }else if(this.isObject(originData)){
                    result = {};
                    model.forEach(function (modelItem) {
                        Object.keys(originData).forEach(function (key) {
                            if(modelItem === key){
                                result[modelItem] = originData[key];
                            }
                        })
                    });
                }
                return result;
            }
        
        }
    }
)