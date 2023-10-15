"use strict";
const importButton = document.getElementById('import');
const resultArea = document.getElementById('result');
const filesInput = document.getElementById('selectFiles');
if (importButton != null && resultArea !== null && filesInput !== null) {
    importButton.onclick = function () {
        var files = filesInput.files;
        console.log(files);
        if (!files || files.length <= 0) {
            return false;
        }
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            console.log(e);
            if (e.target) {
                var result = JSON.parse(e.target.result);
                var formatted = JSON.stringify(result, null, 2);
                resultArea.value = formatted;
            }
        };
        !!files.item(0) && fileReader.readAsText(files.item(0));
    };
}
