var bankList = [];

var saveUtils = {
    nvl: function (id) {
        return document.getElementById(id).value || "No Data";
    },
    getBankList: function () {
        var storeString = localStorage.getItem("bankList");
        return storeString ? JSON.parse(storeString) : [];
    },
    createCrd: function () {
        bankList = this.getBankList();
        var length = bankList.length,
            item = {
                Name: this.nvl("edBankName"),
                BIK: this.nvl("edBankBIK"),
                CorrAccount: this.nvl("edCorrespondentAccount"),
                Address: this.nvl("edAddress"),
                LinkID: length,
                id: "crdBank" + length
            };
        if (this.editedItem) {
            for (var i = 0; i < bankList.length; i++) {
                if (bankList[i].id === this.editedItem.id) {
                    bankList[i] = item;
                }
            }
        } else {
            bankList.push(item);
        }
        localStorage.setItem("bankList", JSON.stringify(bankList));
    },
    saveBankInfo: function () {
        if (form.checkValidity()) {
            this.createCrd();
            this.placeCard();
        }
    },
    processBankList: function (topItemFlag, bankList) {
        bankList = bankList || this.getBankList();

        var startFrom = topItemFlag ? bankList.length - 1 : 0;
        for (var i = startFrom; i < bankList.length; i++) {
            if (i !== 0) {
                var lastElem = document.getElementById(bankList[i - 1].id);
                var newCard = lastElem.cloneNode(true);
            } else {
                var newCard = document.getElementById("bankList").querySelectorAll("div.card")[0];
            }
            var item = bankList[i];

            newCard.id = item.id;
            newCard.querySelector("h5").innerText = item.Name;
            newCard.querySelectorAll("span.card-text").forEach(function (value) {
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
        saveUtils.changeListVisibility();
    },
    placeCard: function () {
        document.getElementById("edFilter").value = "";
        this.clearListView();
        bankList = this.getBankList();
        this.processBankList();
        this.changeListVisibility();
    },
    clearListView: function () {
        var cardList = document.getElementById("bankList").querySelectorAll("div.card");
        for (var i = 1; i < cardList.length; i++) {
            document.getElementById(cardList[i].id).remove();
        }
    },
    deleteBank: function (context) {
        var parentID = context.parentElement.offsetParent.id;
        if (bankList.length !== 1 && parentID) {
            document.getElementById(parentID).remove();
        }
        var viewBankList = bankList;
        bankList = this.getBankList();
        bankList = bankList.filter(function (value) {
            return parentID !== value.id
        });
        localStorage.setItem("bankList", JSON.stringify(bankList));

        bankList = viewBankList.filter(function (value) {
            return parentID !== value.id
        });
        this.changeListVisibility();

    },
    editBank: function (context) {
        var parentID = context.parentElement.offsetParent.id;
        for (var i = 0; i < bankList.length; i++) {
            var item = bankList[i];
            if (item.id === parentID) {
                document.getElementById("edBankName").value = item.Name;
                document.getElementById("edBankBIK").value = item.BIK;
                document.getElementById("edCorrespondentAccount").value = item.CorrAccount;
                document.getElementById("edAddress").value = item.Address;
                this.editedItem = item;
                break;
            }
        }
        showModalWindow();
    },
    changeListVisibility: function () {
        document.getElementById("counter").innerText = bankList.length;
        if (bankList.length !== 0) {
            document.getElementById("bankList").style.display = "block";
            document.getElementById("noDataField").style.display = "none";

        } else {
            document.getElementById("bankList").style.display = "none";
            document.getElementById("noDataField").style.display = "block";
        }
    },
    filter: function (context) {
        this.clearListView();
        bankList = [];

        saveUtils.changeListVisibility();
        bankList = this.getBankList();
        var newBankList = [],
            filterText = document.getElementById("edFilter").value || "";
        for (var i = 0; i < bankList.length; i++) {
            var item = bankList[i];
            var summaryStr = (item.Name + item.BIK + item.CorrAccount + item.Address).toLowerCase();
            if (summaryStr.indexOf(filterText.toLowerCase()) !== -1) {
                newBankList.push(item);
            }
        }
        bankList = newBankList;
        this.processBankList(false, bankList);
    },
    editedItem: null
};

function showModalWindow() {
    document.getElementById("modalWindow").style.display = "block";
}

function hideModalWindow() {
    form.reset();
    document.getElementById("modalWindow").style.display = "none";
}

var onShow = function () {
    bankList = saveUtils.getBankList();
    saveUtils.processBankList();
};