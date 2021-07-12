class Main {
    constructor() {
        this.host = 'http://cukcuk.manhnv.net/v1/'
        this.path = 'Employees'
        this.url = this.host + this.path
        this.showToast = false;
        this.pageSize = 10;
        this.pageNumber = 1;
        this.totalPage;
        this.loadDataFiltered(this.pageSize, this.pageNumber, '', '')
        this.initEvents()
    }

    initEvents() {
        
    }

    //#region Lấy bản ghi từ api

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
                    me.bindData(response)
                }
            }).done(function(response){
                console.log(response)
                showToast('success', 'Cập nhật dữ liệu thành công!', me.showToast)
                me.showToast = true;
            }).fail(function(error){
                console.log(error)
                showToast('error','Có lỗi xảy ra!')
            })
        } catch (error) {
            console.log(error)
        }
    }

    loadDataFiltered(pageSize, pageNumber, departmentId, positionId ) {
        let me = this;
        try {
            $.ajax({
                url: this.url + `/employeeFilter?pageSize=${ pageSize }&pageNumber=${ pageNumber }&employeeFilter=NV&departmentId=${departmentId}&positionId=${positionId}`,
                method: "get",
                success: function (response) {
                    me.totalPage = response.TotalPage
                    me.bindData(response.Data)
                }
            }).done(function(response){
                me.showToast = false
                showToast('success', 'Cập nhật dữ liệu thành công!', me.showToast)
                me.showToast = true;
            }).fail(function(error){
                console.log(error)
                showToast('error','Có lỗi xảy ra!')
            })
        } catch (error) {
            console.log(error)
        }
    }

    //#endregion

    //#region Bind dữ liệu vào table

    /**
     * Hàm bind data vào table
     * @author: NMTuan (08/07/2021)
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

    //#endregion

    /**
     * Hàm sắp xếp dữ liệu
     * Hàm viết thừa không dùng để làm gì
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

    //#region Thêm 1 bản ghi mơi

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
                dataType: "json",
                data: data,
                contentType: "application/json-patch+json",
            }).done(function(){
                showToast('success', 'Thêm dữ liệu thành công!')
                me.loadData()
            }).fail(function(){
                showToast('error', 'Có lỗi xảy ra!')
            });
        } catch (error) {
            console.log(error)
        }
    }
    //#endregion

    //#region Update lại dữ liệu 1 bản ghi
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
                dataType: "json",
                data: data,
                contentType: "application/json-patch+json",
            }).done(function(){
                showToast('success','Sửa dữ liệu thành công!')
                me.loadData()
            }).fail(function(){
                showToast('error', 'Có lỗi xảy ra!')
            })
        } catch (error) {
            console.log(error)
        }
    }
    //#endregion

    //#region Xóa bản ghi
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
            }).done(function(){
                showToast('success','Đã xóa thành công!')
                me.loadData()
            }).fail(function(){
                showToast('error', 'Có lỗi xảy ra!')
            });
        } catch (error) {
            console.log(error)
        }
    }

    deleteMultiple(data) {
        let me = this
        let rs = true
        try {
            for ( var index in data) {
                $.ajax({
                    url: "http://cukcuk.manhnv.net/v1/Employees/" + data[index],
                    method: "delete",
                }).done(function(){
                    console.log(index)
                }).fail(function(error){
                    console.log(error)
                    rs = false;
                });
            }
        } catch (error) {
            console.log(error)
        }
        
        return rs;
    }
    //#endregion

    //#region Lấy dữ liệu 1 bản ghi theo id
    /**
     * Hàm lấy dữ liệu 1 bản ghi theo id
     * @param {string} id employeeId
     */
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
            }).fail(function(){
                showToast('error', 'Có lỗi xảy ra!')
            })
        } catch (error) {
            console.log(error)
        }
    }

    bindDataToForm() {

    }

    //#endregion

    //#region Lấy mã nhân viên mới
    async getNewEmployeeCode(){
        let me = this;
        let res;
        try {
            await $.ajax({
                url: this.url + "/NewEmployeeCode",
                method: "get",
                success: function (response) {
                    console.log(response)
                    res = response
                }
            }).fail(function(){
                showToast('error', 'Có lỗi xảy ra!')
            })
        } catch (error) {
            console.log(error)
        }

        return res;
    }
    //#endregion


}