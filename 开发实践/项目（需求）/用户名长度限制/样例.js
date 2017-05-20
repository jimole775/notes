$("#userName").on("input", function (event) {
            var val = this.value;
            var cnLen = 0;
            if (val) {
                val.split("").forEach(function (item) {
                    if (item.charCodeAt().toString(16).length >= 4) {
                        cnLen++;
                    }
                });
            }
            this.maxLength = cnLen + (14 - cnLen * 2);  //动态设置最大长度
        });