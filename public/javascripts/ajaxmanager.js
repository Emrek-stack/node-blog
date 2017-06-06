var AjaxManager = function() {
    $.support.cors = true;
    return {
        formatParameters: function(formObjects, method) {
            var paramList = '';
            if (method.toUpperCase() === RequestType.POST) {

                if (formObjects.length > 0) {
                    for (var i = 0; i < formObjects.length; i++) {
                        if (paramList.length > 0) paramList += ',';
                        paramList += formObjects[i].name + ':"' + formObjects[i].value + '"';
                    }
                    paramList = '{' + paramList + '}';

                }

            } else if (method.toUpperCase() === RequestType.GET) {

                paramList = formObjects;


                //if (formObjects.length > 0) {
                //    for (var j = 0; j < formObjects.length; j += 2) {
                //        if (paramList.length > 0) paramList += "&";
                //        paramList += formObjects[j] + "=" + formObjects[j + 1];
                //    }
                //}

            }
            return paramList;
        },

        callAjax: function(method, url, data, dataType, successfn, completefn, errorfn) {
            $.support.cors = true;

            $.ajaxSetup({
                cache: false
            });

            $.ajax({
                beforeSend: function(request) {
                    request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                },
                type: method,
                contentType: 'application/json; charset=utf-8',
                url: url,
                data: data,
                dataType: dataType,
                crossDomain: false,
                success: successfn == null ? function() {} : successfn,
                //function(data, status, xhr) {
                //if (successfn != null) {
                //    successfn(data, status, xhr);
                //}
                // },
                complete: completefn == null ? function() {} : completefn,
                error: errorfn == null ? function() {} : errorfn
                    //function (xhr, status, error) {
                    //if (errorfn != null) {
                    //    errorfn(xhr, status, error);
                    //}
                    //}
            });
        },

        Ajax: function(url, requestType, dataType, paramArray, successfn, completefn, errorfn) {
            $.ajaxSetup({
                cache: false
            });
            var paramList = null;

            if (paramArray != null)
                paramList = this.formatParameters(paramArray, requestType);

            this.callAjax(requestType, url, paramList, successfn, completefn, errorfn);
        },

        AjaxPost: function(url, paramArray, successfn, completefn, errorfn) {
            $.ajaxSetup({
                cache: false
            });
            var paramList = null;

            if (paramArray != null)
                paramList = this.formatParameters(paramArray, RequestType.POST);

            this.callAjax(RequestType.POST, url, paramList, DataType.JSON, successfn, completefn, errorfn);
        },

        AjaxWebApi: function(url, requestType, dataType, paramArray, successfn, completefn, errorfn) {
            $.ajaxSetup({
                cache: false
            });

            url = Configuration.apiServiceUrl + url;

            var paramList = null;

            if (paramArray != null)
                paramList = this.formatParameters(paramArray, requestType);

            this.callAjax(requestType, url, paramList, successfn, completefn, errorfn);
        },

        AjaxWithForm: function(formObj, dataType, successfn, completefn, errorfn) {
            var form = $(formObj);
            //var options = form.data(); //TODO : feature

            var url = form.attr('action');
            var method = form.attr('method');
            var formObjects = method.toUpperCase() === RequestType.POST ? form.serializeArray() : form.serialize();

            var paramList = this.formatParameters(formObjects, method);
            this.callAjax(method, url, paramList, dataType, successfn, completefn, errorfn);
        },

        callAjaxForm: function(url, data, dataType, contentType, processData, successfn, completefn, errorfn) {
            $.support.cors = true;
            $.ajaxSetup({
                cache: false
            });
            if (contentType == null) {
                contentType = false;
            }
            if (processData == null) {
                processData = false;
            }
            $.ajax({
                contentType: contentType,
                processData: processData,
                url: url,
                data: data,

                success: function(data, status, xhr) {
                    if (successfn != null) {
                        successfn(data, status, xhr);
                    }
                },
                complete: function(data) {
                    if (completefn != null) {
                        completefn(data.name);
                    }
                },
                error: function(xhr, status, error) {
                    if (errorfn != null) {
                        errorfn(xhr, status, error);
                    }
                }
            });
        }
    };
}();