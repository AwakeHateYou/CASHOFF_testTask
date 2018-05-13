var bankList = [],
    lastCard;

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
            LinkID: bankList.length
        });
    },
    saveBankInfo: function () {
        console.log("Save in progress");
        this.createCrd();
        this.placeCard();
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
                var newCard = crdBank.cloneNode(true);
                newCard.id = newCard.id + (item.LinkID);
                newCard.querySelector("h5").innerText = item.Name;
                newCard.querySelectorAll("li").forEach(function (value) {
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
                crdBank.parentNode.insertBefore(newCard, crdBank.nextSibling);
            }
        }
    },
    deleteBank: function (context) {
        var parentID = context.offsetParent.id;
        document.getElementById(parentID).remove();
    }
};

var onShow = function () {
    if (bankList.length !== 0) {
        document.getElementById("bankList").style.visibility = "visible";
    }
};