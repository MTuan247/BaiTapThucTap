class Main {
    constructor() {
        this.host = 'http://cukcuk.manhnv.net/v1/'
        this.path = 'Employees'
        this.url = this.host + this.path
        this.data = []
        this.loadData()
        this.initEvents()
    }

    initEvents() {
        
    }

    /**
    * Hàm load dữ liệu từ api
    * Author: NMTuan (05/07/2021)
    */
    loadData() {
        let me = this;
        try {
            $.ajax({
                url: this.url,
                method: "get",
                success: function (response) {
                    console.log(response)
                    me.data = response
                    me.bindData(me.data)
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Hàm bind data
     * @param {json} response 
     */
    bindData(response) {

        $(".grid table tbody").empty()

        response.map((item, index) => {

            let tr = $('<tr></tr>')
            let employeeId = item.EmployeeId
            tr = $(tr).attr('employeeId', employeeId)
            let theads = $('.grid table tr th')
            $(theads).each((i, thead) => {
                let td = $(`<td></td>`)
                let fieldName = $(thead).attr('fieldName');
                let value = item[fieldName]
                value = formatData(value, fieldName)
                td = formatCell(td, fieldName, index)
                td.append(value)
                tr.append(td)
            })

            $(".grid table tbody").append(tr)
        })
    }

    /**
     * Hàm sắp xếp dữ liệu
     * @param {fieldName} fieldName 
     */
    sortData(fieldName) {
        this.data.sort(function(a,b){
            if(a[fieldName] < b[fieldName]) return -1;
            if(a[fieldName] > b[fieldName]) return 1;
            if (a[fieldName] == null) return -1;
            return 0;
        })
    }

    /**
     * Hàm thêm dữ liệu, post method
     * Author: NMTuan (08/07/2021)
     * @param {json} data 
     */
    addData(data) {
        let me = this
        try {
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees",
                method: "post",
                dataType: "application/json",
                data: data,
                contentType: "application/json-patch+json",
                complete: function(){
                    me.loadData()
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Hàm update data, put method
     * Author: NMTuan (08/07/2021)
     * @param {string} id 
     * @param {json} data 
     */
    updateData(id, data) {
        let me = this
        try {
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees/" + id,
                method: "put",
                dataType: "application/json",
                data: data,
                contentType: "application/json-patch+json",
                complete: function(){
                    me.loadData()
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Hàm xóa dữ liệu, delete method
     * Author: NMTuan (08/07/2021)
     * @param {string} id employeeId
     */
    deleteData(id) {
        let me = this
        try {
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees/" + id,
                method: "delete",
                // dataType: "application/json",
                // data: data,
                // contentType: "application/json-patch+json",
                complete: function(){
                    me.loadData()
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    loadDataById(id) {
        let me = this;
        try {
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees/" + id,
                method: "get",
                success: function (response) {
                    console.log(response)
                    $('.info-form .field-label').each((index, item) => {
                        let fieldName = $(item).attr('fieldName')
                        let fieldType = $(item).attr('fieldType')
                        let value =response[fieldName]
                        value = formatDataInput(value, fieldType)
                        
                        $(item).find('input').val(value)
                        $(item).trigger('focusout')
                    })
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    bindDataToForm() {

    }
}