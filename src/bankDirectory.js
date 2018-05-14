var bankList = [],
    lastCard,
    storage = localStorage;

var saveUtils = {
    nvl: function (id) {
        return document.getElementById(id).value || "No Data";
    },
    createCrd: function () {
        bankList.push({
            Name: this.nvl("edBankName"),
            BIK: this.nvl("edBankBIK"),
            CorrAccount: this.nvl("edCorrespondentAccount"),
            Address: this.nvl("edAddress"),
            LinkID: bankList.length,
            id: "crdBank" + bankList.length
        });
        localStorage.setItem("bankList", JSON.stringify(bankList));
    },
    saveBankInfo: function () {
        if (form.checkValidity()) {
            console.log("Save in progress");
            this.createCrd();
            this.placeCard();
        }
    },
    processBankList: function(topItemFlag){
        var startFrom = topItemFlag ? bankList.length - 1 : 0;
        for (var i = startFrom; i < bankList.length; i++){
            if (i !== 0) {
                var lastElem = document.getElementById(bankList[i - 1].id);
                var newCard = lastElem.cloneNode(true);
            } else {
                var newCard = document.getElementById("crdBank0");
            }
            var item = bankList[i];
            newCard.id = item.id;
            newCard.querySelector("h5").innerText = item.Name;
            newCard.querySelectorAll("p").forEach(function (value) {
                switch (value.id) {
                    case "crdBIK":
                        value.innerText = item.BIK;
                        break;
                    case "crdCorrAccount":
                        value.innerText = item.CorrAccount;
                        break;
                    case "crdAddress":
                        value.innerText = item.Address;
                        break;
                    default:
                        break;
                }
            });
            if (i !== 0) {
                lastElem.parentNode.insertBefore(newCard, lastElem.nextSibling);
            }
        }
    },
    placeCard: function () {
        var index = bankList.length - 1,
            item = bankList[index];
        if (bankList.length === 1) {
            crdBankName.innerText = item.Name;
            crdBIK.innerText = item.BIK;
            crdCorrAccount.innerText = item.CorrAccount;
            crdAddress.innerText = item.Address;
            document.getElementById("bankList").style.visibility = "visible";
        } else {
            if (bankList.length > 1) {
                var lastElem = document.getElementById(bankList[index - 1].id);
                var newCard = lastElem.cloneNode(true);
                newCard.id = item.id;
                newCard.querySelector("h5").innerText = item.Name;
                newCard.querySelectorAll("p").forEach(function (value) {
                    switch (value.id) {
                        case "crdBIK":
                            value.innerText = item.BIK;
                            break;
                        case "crdCorrAccount":
                            value.innerText = item.CorrAccount;
                            break;
                        case "crdAddress":
                            value.innerText = item.Address;
                            break;
                        default:
                            break;
                    }
                });
                lastElem.parentNode.insertBefore(newCard, lastElem.nextSibling);
            }
        }
        this.clearInput();
        this.changeListVisibility();
    },
    deleteBank: function (context) {
        var parentID = context.parentElement.offsetParent.id;
        if (bankList.length !== 1 && parentID) {
            document.getElementById(parentID).remove();
        }

        var newBankList = [];
        for (var i = 0; i < bankList.length; i++) {
            if (parentID !== bankList[i].id) {
                newBankList.push(bankList[i]);
            }
        }
        bankList = newBankList;
        this.changeListVisibility();
        localStorage.setItem("bankList", JSON.stringify(bankList));
    },
    changeListVisibility: function () {
        if (bankList.length !== 0) {
            document.getElementById("bankList").style.visibility = "visible";
        } else {
            document.getElementById("bankList").style.visibility = "hidden";
        }
    },
    clearInput: function () {
        document.getElementById("edBankName").value = "";
        document.getElementById("edBankBIK").value = "";
        document.getElementById("edCorrespondentAccount").value = "";
        document.getElementById("edAddress").value = "";
    }
};

var onShow = function () {
    var storeString = localStorage.getItem("bankList");
    bankList = storeString ? JSON.parse(storeString) : [];
    saveUtils.processBankList();
    saveUtils.changeListVisibility();
};