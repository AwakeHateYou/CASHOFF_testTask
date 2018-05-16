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
            this.createCrd();
            this.placeCard();
        }
    },
    processBankList: function(topItemFlag, filterText){
        var storeString = localStorage.getItem("bankList");
        bankList = storeString ? JSON.parse(storeString) : [];

        var startFrom = topItemFlag ? bankList.length - 1 : 0,
            newBankList = [];
        for (var i = startFrom; i < bankList.length; i++){
            if (i !== 0) {
                var lastElem = document.getElementById(bankList[i - 1].id);
                var newCard = lastElem.cloneNode(true);
            } else {
                var newCard = document.getElementById("crdBank0");
            }
            var item = bankList[i];
            if (filterText && filterText !== ""){
                var summaryStr = (item.Name + item.BIK + item.CorrAccount + item.Address).toLowerCase();
                if (summaryStr.indexOf(filterText.toLowerCase()) == -1){
                    continue;
                } else {
                    newBankList.push(item);
                }
            }
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
                lastElem.parentNode.insertBefore(newCard, lastElem);
            }
        }
        if (filterText && filterText !== ""){
            bankList = newBankList;
        }
        saveUtils.changeListVisibility();
    },
    placeCard: function () {
        this.processBankList(true);
        this.changeListVisibility();
    },
    deleteBank: function (context) {
        var parentID = context.parentElement.offsetParent.id;
        if (bankList.length !== 1 && parentID) {
            document.getElementById(parentID).remove();
        } else {
            document.getElementById(parentID).id = "crdBank0";
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
        document.getElementById("counter").innerText = bankList.length;
        if (bankList.length !== 0) {
            document.getElementById("bankList").style.display = "inline";
            document.getElementById("noDataField").style.display = "none";

        } else {
            document.getElementById("bankList").style.display = "none";
            document.getElementById("noDataField").style.display = "inline";
        }
    },
    filter: function (context) {
        for (var i = 1; i < bankList.length; i++) {
            if (document.getElementById(bankList[i].id)) {
                document.getElementById(bankList[i].id).remove();
            }

        }
        bankList = [];
        saveUtils.changeListVisibility();
        this.processBankList(false, document.getElementById("edFilter").value || "");
    }
};

var onShow = function () {
    var storeString = localStorage.getItem("bankList");
    bankList = storeString ? JSON.parse(storeString) : [];
    saveUtils.processBankList();
};