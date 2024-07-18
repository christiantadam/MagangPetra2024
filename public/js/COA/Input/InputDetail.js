var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// tanggal
var tanggal = document.getElementById('tanggal');
var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
var todayString = year + '-' + month + '-' + day;
var tahun = document.getElementById('year');

// button
var btn_RefNo = document.getElementById('btn_RefNo');
var btn_BagCode = document.getElementById('btn_BagCode');

var btn_isi = document.getElementById('btn_isi');
var btn_simpan = document.getElementById('btn_simpan');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

// weight radio
var radioWeight1 = document.getElementById('radioWeight1');
var radioWeight2 = document.getElementById('radioWeight2');
var weightLabel = document.getElementById('weightLabel');
var formWeight1 = document.getElementById('formWeight1');
var formWeight2 = document.getElementById('formWeight2');

// attribut
var No = document.getElementById('No.');
var refNo = document.getElementById('refNo');
var customer = document.getElementById('customer');
var bagCode = document.getElementById('bag-code');
var bagType = document.getElementById('bag-type');
var poNo = document.getElementById('po-no');
var prodDate = document.getElementById('prod-date');
var testingDate = document.getElementById('testing-date');
var size = document.getElementById('size');
var reinforced = document.getElementById('reinforced');
var colour = document.getElementById('colour');
var swl = document.getElementById('swl');
var sf = document.getElementById('sf');

var liftBeltType = document.getElementById('liftBeltType');
var sewingThreadType = document.getElementById('sewingThreadType');
var topS1 = document.getElementById('topS1');
var topS2 = document.getElementById('topS2');
var topS3 = document.getElementById('topS3');
var topS4 = document.getElementById('topS4');
var topS5 = document.getElementById('topS5');
var topE1 = document.getElementById('topE1');
var topE2 = document.getElementById('topE2');
var topE3 = document.getElementById('topE3');
var topE4 = document.getElementById('topE4');
var topE5 = document.getElementById('topE5');
var bottomS1 = document.getElementById('bottomS1');
var bottomS2 = document.getElementById('bottomS2');
var bottomS3 = document.getElementById('bottomS3');
var bottomS4 = document.getElementById('bottomS4');
var bottomS5 = document.getElementById('bottomS5');
var bottomE1 = document.getElementById('bottomE1');
var bottomE2 = document.getElementById('bottomE2');
var bottomE3 = document.getElementById('bottomE3');
var bottomE4 = document.getElementById('bottomE4');
var bottomE5 = document.getElementById('bottomE5');
var Copy_RefNo;

// atribut weight
var inputIds1 = ['Panjang', 'Lebar', 'Waft', 'Denier_Waft', 'Weft', 'Denier_Weft'];
var inputs1 = inputIds1.map(id => document.getElementById(id));
var weight1 = document.getElementById('weight1');

var inputIds2 = ['Panjang2', 'Lebar2', 'Waft2', 'Denier_Waft2', 'Weft2', 'Denier_Weft2'];
var inputs2 = inputIds2.map(id => document.getElementById(id));
var weight2 = document.getElementById('weight2');

// specific div
var fibcDetailDiv = document.getElementById('fibc_detail');
var inputFibcDetail = fibcDetailDiv.querySelectorAll('input');
var jenisDetailDiv = document.getElementById('jenis');
var jenisDetail = jenisDetailDiv.querySelectorAll('input');
var bagDetailDiv = document.getElementById('bag_detail');
var inputsInBagDetail = bagDetailDiv.querySelectorAll('input');
var sewingMethodDiv = document.getElementById('sewingMethod');
var sewingDetail = sewingMethodDiv.querySelectorAll('input');
var stitchApproxDiv = document.getElementById('stitchApprox');
var stitchDetail = stitchApproxDiv.querySelectorAll('input');
var fitDrawDiv = document.getElementById('fitDraw');
var drawDetail = fitDrawDiv.querySelectorAll('input');

const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));
const inputAll = Array.from(document.querySelectorAll('.card-body input[type="text"]'));

var fixRefNo = '';
var jenis = [];
var sewing = [];
var stitch = [];
var draw = [];
var centangCheck = [];

var sections = [
    { id: 'jenis', checkboxes: ['Sample', 'Pre-production', 'Production', 'Spec. Modification', 'Trial', 'Sample dari Customer'] },
    { id: 'sewingMethod', checkboxes: ['Mitsumaki', 'Half Mitsumaki', 'Ogami', 'Other'], },
    { id: 'stitchApprox', checkboxes: ['Bottom', 'Side Body', 'Lifting Belt'] },
    { id: 'fitDraw', checkboxes: ['Yes', 'No'] }
];

let splitRefNo = null;
let calculateWeightExecuted = false;
let a; // isi = 1, koreksi = 2, hapus = 3

const notReq = [
    'topS1', 'topS2', 'topS3', 'topS4', 'topS5',
    'topE1', 'topE2', 'topE3', 'topE4', 'topE5',
    'bottomS1', 'bottomS2', 'bottomS3', 'bottomS4', 'bottomS5',
    'bottomE1', 'bottomE2', 'bottomE3', 'bottomE4', 'bottomE5'
];

// fungsi berhubungan dengan ENTER
inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            // console.log(masuk.id);

            if (masuk.id === 'refNo') {
                inputs[index].disabled = false;
            }

            if (masuk.value.trim() === '') {
                event.preventDefault();

                if (masuk.id === 'po-no') {
                    masuk.value = 'UNKNOWN';
                    prodDate.focus();

                } else {
                    if (notReq.includes(masuk.id)) {
                        if (index < inputs.length - 1) {
                            inputs[index + 1].focus();
                        }
                    }
                }
            } else if (masuk.id === 'size') {
                focusAndControlReinforced(index);
            } else if (masuk.id === 'Denier_Weft' || masuk.id === 'Denier_Weft2') {
                // enter pertama hitung weight, enter kedua membuka div bag detail
                if (!calculateWeightExecuted) {
                    calculateWeight();
                    calculateWeightExecuted = true;
                } else {
                    inputsInBagDetail.forEach(function (input) { // membuka input pada div bag detail
                        input.disabled = false;
                    });

                    liftBeltType.focus();
                }
            } else if ((index < inputs.length - 1 && masuk.id !== 'liftBeltType') || (index < inputs.length - 1 && masuk.id !== 'sewingThreadType')) {
                inputs[index + 1].focus();
            }
        }
    });
});

// fungsi event listener untuk liftBeltType
liftBeltType.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        if (liftBeltType.value === '') {
            event.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Inputkan Type Lifting Belt Terlebih Dahulu!`,
                returnFocus: false
            }).then(() => {
                liftBeltType.focus();
            });
        } else {
            sewingThreadType.focus();
        }
    }
});

// fungsi event listener untuk sewingThreadType
sewingThreadType.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        if (sewingThreadType.value === '') {
            event.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Inputkan Type Sewing Thread Terlebih Dahulu!`,
                returnFocus: false
            }).then((result) => {
                if (result.isConfirmed) {
                    sewingThreadType.focus();
                }
            });
        } else {
            inputsInBagDetail.disabled = false;
            topS1.focus();
        }
    }
});

// Handle focus jika input diubah manual setelah Swal muncul
sewingThreadType.addEventListener('input', function () {
    if (sewingThreadType.value === '') {
        sewingThreadType.focus();
    }
});

// fungsi kontrol reinforce option
function focusAndControlReinforced(index) {
    reinforced.focus();
    reinforced.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();

            var selectedIndex = reinforced.selectedIndex;
            if (event.key === 'ArrowUp') {
                selectedIndex = (selectedIndex === 0) ? reinforced.options.length - 1 : selectedIndex - 1;
            } else if (event.key === 'ArrowDown') {
                selectedIndex = (selectedIndex === reinforced.options.length - 1) ? 0 : selectedIndex + 1;
            }

            reinforced.selectedIndex = selectedIndex;
        } else if (event.key === 'Enter') {
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
    });
}

// button ref no
btn_RefNo.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Reference',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Ref No</th>
                            <th scope="col">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_list")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            timeout: 30000,
            width: '40%',
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                const table = $("#table_list").DataTable({
                    responsive: true,
                    processing: true,
                    serverSide: true,
                    order: [1, "asc"],
                    ajax: {
                        url: "FrmInputFIBC/GetReff",
                        dataType: "json",
                        type: "GET",
                        data: {
                            _token: csrfToken
                        }
                    },
                    columns: [
                        { data: "Reference_No" },
                        { data: "Tanggal" }
                    ]
                });

                $("#table_list tbody").on("click", "tr", function () {
                    table.$("tr.selected").removeClass("selected");
                    $(this).addClass("selected");
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const selectedRow = result.value;

                splitRefNo = selectedRow.Reference_No.trim();

                let parts = splitRefNo.split("/");
                let extractedNo = parts[0];
                let extractedRefNo = parts[2];

                No.value = extractedNo; // no reff
                refNo.value = extractedRefNo; // keterangan reff

                inputFibcDetail.forEach(function (input) { // menutup input pada div fibc detail
                    input.disabled = false;
                });
                jenisDetail.forEach(function (input) { // membuka input checkbox jenis
                    input.disabled = false;
                });
                inputsInBagDetail.forEach(function (input) { // menutup input pada div bag detail
                    input.disabled = false;
                });
                sewingDetail.forEach(function (input) { // membuka input checkbox sewing
                    input.disabled = false;
                });
                stitchDetail.forEach(function (input) { // membuka input checkbox stitch
                    input.disabled = false;
                });
                drawDetail.forEach(function (input) { // membuka input checkbox fit to draw
                    input.disabled = false;
                });

                $.ajax({
                    url: "FrmInputFIBC/getDataDetailReference",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        no_ref: splitRefNo
                    },
                    timeout: 30000,
                    success: function (result) {

                        tanggal.value = new Date(result[0].Tanggal).toISOString().split('T')[0];
                        tahun.value = new Date(result[0].Tanggal).getFullYear().toString();
                        customer.value = result[0].Customer.trim();
                        bagCode.value = result[0].Bag_Code.trim();
                        bagType.value = result[0].Bag_Type.trim();
                        poNo.value = result[0].PO_No.trim();
                        prodDate.value = new Date(result[0].Tanggal_Prod).toISOString().split('T')[0];
                        testingDate.value = new Date(result[0].Tanggal_Testing).toISOString().split('T')[0];
                        size.value = result[0].Size.trim();
                        reinforced.value = result[0].Reinforced;
                        colour.value = result[0].Colour.trim();
                        swl.value = result[0].SWL.trim();
                        sf.value = result[0].SF.trim();


                        for (var i = 0; i < inputIds1.length; i++) {
                            if (result[0][inputIds1[i]]) {
                                inputs1[i].value = result[0][inputIds1[i]].trim();
                            }
                            if (result[0][inputIds2[i]]) {
                                inputs2[i].value = result[0][inputIds2[i]].trim();
                            }
                        }

                        weight1.value = result[0].Weight;
                        weight2.value = result[0].Weight2;

                        // Convert to numbers for comparison
                        let numWeight1 = parseFloat(weight1.value);
                        let numWeight2 = parseFloat(weight2.value);


                        if (numWeight1 !== null && numWeight2 > 0.00) {
                            radioWeight2.checked = true;
                            formWeight1.style.display = 'none';
                            formWeight2.style.display = 'block';
                            weightLabel.textContent = "Weight 2";
                        } else {
                            radioWeight1.checked = true;
                            formWeight1.style.display = 'block';
                            formWeight2.style.display = 'none';
                            weightLabel.textContent = "Weight 1";

                        }

                        //checkbox
                        jenis.value = result[0].Jenis_FIBC ? result[0].Jenis_FIBC.trim() : '';
                        sewing.value = result[0].Sewing_Method ? result[0].Sewing_Method.trim() : '';
                        stitch.value = result[0].Stitch_Approx ? result[0].Stitch_Approx.trim() : '';
                        draw.value = result[0].Fit_to_Draw ? result[0].Fit_to_Draw.trim() : '';

                        // console.log(jenis.value);
                        // console.log(sewing.value);
                        // console.log(stitch.value);
                        // console.log(draw.value);

                        retrieveCheck('jenis', jenis.value);
                        retrieveCheck('sewingMethod', sewing.value);
                        retrieveCheck('stitchApprox', stitch.value);
                        retrieveCheck('fitDraw', draw.value);

                        // fungsi memunculkan centang sesuai isi database
                        function retrieveCheck(sectionId, value) {
                            var section = sections.find(s => s.id === sectionId);
                            if (section) {
                                section.checkboxes.forEach(function (checkboxName) {
                                    var checkbox = document.querySelector(`#${sectionId} input[name="${checkboxName}"]`);
                                    if (checkbox) {
                                        checkbox.checked = (checkboxName === value);
                                    }
                                });
                            }
                        }

                        liftBeltType.value = result[0].LiftingBelt_Type ? result[0].LiftingBelt_Type.trim() : '';
                        sewingThreadType.value = result[0].SewingThread_Type ? result[0].SewingThread_Type.trim() : '';

                        topS1.value = result[0].Top_KG_1.trim();
                        topS2.value = result[0].Top_KG_2.trim();
                        topS3.value = result[0].Top_KG_3.trim();
                        topS4.value = result[0].Top_KG_4.trim();
                        topS5.value = result[0].Top_KG_5.trim();
                        topE1.value = result[0].Top_Persen_1.trim();
                        topE2.value = result[0].Top_Persen_2.trim();
                        topE3.value = result[0].Top_Persen_3.trim();
                        topE4.value = result[0].Top_Persen_4.trim();
                        topE5.value = result[0].Top_Persen_5.trim();

                        bottomS1.value = result[0].Bottom_KG_1.trim();
                        bottomS2.value = result[0].Bottom_KG_2.trim();
                        bottomS3.value = result[0].Bottom_KG_3.trim();
                        bottomS4.value = result[0].Bottom_KG_4.trim();
                        bottomS5.value = result[0].Bottom_KG_5.trim();
                        bottomE1.value = result[0].Bottom_Persen_1.trim();
                        bottomE2.value = result[0].Bottom_Persen_2.trim();
                        bottomE3.value = result[0].Bottom_Persen_3.trim();
                        bottomE4.value = result[0].Bottom_Persen_4.trim();
                        bottomE5.value = result[0].Bottom_Persen_5.trim();
                    }
                });
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

// button bag code
btn_BagCode.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Bag Code',
            html: `
                <table id="table_bagCode" class="table">
                    <thead>
                        <tr>
                            <th scope="col">Ref No</th>
                            <th scope="col">Bag Code</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            `,
            preConfirm: () => {
                const selectedData = $("#table_bagCode")
                    .DataTable()
                    .row(".selected")
                    .data();
                if (!selectedData) {
                    Swal.showValidationMessage("Please select a row");
                    return false;
                }
                return selectedData;
            },
            timeout: 30000,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_bagCode").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "FrmInputFIBC/GetBagCode",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }

                        },
                        timeout: 30000,
                        columns: [
                            { data: "Reference_No" },
                            { data: "Bag_Code" }
                        ]
                    });

                    $("#table_bagCode tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                inputFibcDetail.forEach(function (input) {
                    input.disabled = false;
                });
                jenisDetail.forEach(function (input) {
                    input.disabled = false;
                });
                inputsInBagDetail.forEach(function (input) {
                    input.disabled = false;
                });
                sewingDetail.forEach(function (input) {
                    input.disabled = false;
                });
                stitchDetail.forEach(function (input) {
                    input.disabled = false;
                });
                drawDetail.forEach(function (input) {
                    input.disabled = false;
                });

                const selectedRow = result.value;
                splitRefNo = selectedRow.Reference_No.trim();
                Copy_RefNo = splitRefNo;

                $.ajax({
                    url: "FrmInputFIBC/getDataDetailBag",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        no_ref: splitRefNo
                    },
                    success: function (result) {
                        // console.log(result.length);
                        if (result && result.length > 0) {
                            bagCode.value = result[0].Bag_Code.trim();
                            bagType.value = result[0].Bag_Type.trim();
                            poNo.value = result[0].PO_No.trim();
                            prodDate.value = new Date(result[0].Tanggal_Prod).toISOString().split('T')[0];
                            testingDate.value = new Date(result[0].Tanggal_Testing).toISOString().split('T')[0];
                            size.value = result[0].Size.trim();
                            reinforced.value = result[0].Reinforced;
                            colour.value = result[0].Colour.trim();
                            swl.value = result[0].SWL.trim();
                            sf.value = result[0].SF.trim();

                            for (var i = 0; i < inputIds1.length; i++) {
                                if (result[0][inputIds1[i]]) {
                                    inputs1[i].value = result[0][inputIds1[i]].trim();
                                }
                                if (result[0][inputIds2[i]]) {
                                    inputs2[i].value = result[0][inputIds2[i]].trim();
                                }
                            }

                            weight1.value = result[0].Weight.trim();
                            weight2.value = result[0].Weight2.trim();

                            let numWeight1 = parseFloat(weight1.value);
                            let numWeight2 = parseFloat(weight2.value);

                            if (numWeight1 === 0.00 && numWeight2 > 0.00) {
                                radioWeight2.checked = true;
                                formWeight1.style.display = 'none';
                                formWeight2.style.display = 'block';
                                weightLabel.textContent = "Weight 2";
                            } else {
                                radioWeight1.checked = true;
                                formWeight1.style.display = 'block';
                                formWeight2.style.display = 'none';
                                weightLabel.textContent = "Weight 1";
                            }

                            jenis.value = result[0].Jenis_FIBC ? result[0].Jenis_FIBC.trim() : '';
                            jenis.push(result[0].Jenis_FIBC ? result[0].Jenis_FIBC.trim() : ''); // supaya kalau isi dari bag code pas di cek allInputsField notif nya tidak keluar

                            sewing.value = result[0].Sewing_Method ? result[0].Sewing_Method.trim() : '';
                            sewing.push(result[0].Sewing_Method ? result[0].Sewing_Method.trim() : '');

                            stitch.value = result[0].Stitch_Approx ? result[0].Stitch_Approx.trim() : '';
                            stitch.push(result[0].Stitch_Approx ? result[0].Stitch_Approx.trim() : '');

                            draw.value = result[0].Fit_to_Draw ? result[0].Fit_to_Draw.trim() : '';
                            draw.push(result[0].Fit_to_Draw ? result[0].Fit_to_Draw.trim() : '');


                            retrieveCheck('jenis', jenis.value);
                            retrieveCheck('sewingMethod', sewing.value);
                            retrieveCheck('stitchApprox', stitch.value);
                            retrieveCheck('fitDraw', draw.value);

                            function retrieveCheck(sectionId, value) {
                                var section = sections.find(s => s.id === sectionId);
                                if (section) {
                                    section.checkboxes.forEach(function (checkboxName) {
                                        var checkbox = document.querySelector(`#${sectionId} input[name="${checkboxName}"]`);
                                        if (checkbox) {
                                            checkbox.checked = (checkboxName === value);
                                        }
                                    });
                                }
                            }

                            liftBeltType.value = result[0].LiftingBelt_Type ? result[0].LiftingBelt_Type.trim() : '';
                            sewingThreadType.value = result[0].SewingThread_Type ? result[0].SewingThread_Type.trim() : '';

                            topS1.value = result[0].Top_KG_1.trim();
                            topS2.value = result[0].Top_KG_2.trim();
                            topS3.value = result[0].Top_KG_3.trim();
                            topS4.value = result[0].Top_KG_4.trim();
                            topS5.value = result[0].Top_KG_5.trim();
                            topE1.value = result[0].Top_Persen_1.trim();
                            topE2.value = result[0].Top_Persen_2.trim();
                            topE3.value = result[0].Top_Persen_3.trim();
                            topE4.value = result[0].Top_Persen_4.trim();
                            topE5.value = result[0].Top_Persen_5.trim();

                            bottomS1.value = result[0].Bottom_KG_1.trim();
                            bottomS2.value = result[0].Bottom_KG_2.trim();
                            bottomS3.value = result[0].Bottom_KG_3.trim();
                            bottomS4.value = result[0].Bottom_KG_4.trim();
                            bottomS5.value = result[0].Bottom_KG_5.trim();
                            bottomE1.value = result[0].Bottom_Persen_1.trim();
                            bottomE2.value = result[0].Bottom_Persen_2.trim();
                            bottomE3.value = result[0].Bottom_Persen_3.trim();
                            bottomE4.value = result[0].Bottom_Persen_4.trim();
                            bottomE5.value = result[0].Bottom_Persen_5.trim();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error("AJAX Error:", status, error);
                    }
                });
            }
        });
    } catch (error) {
        console.error("Exception occurred:", error);
    }
});



let isWeight2Selected = false;

// fungsi setting weight radio button
function handleRadioChange() {
    if (radioWeight1.checked) {
        formWeight1.style.display = 'block';
        formWeight2.style.display = 'none';
        weightLabel.textContent = "Weight 1";
        isWeight2Selected = false;
    } else if (radioWeight2.checked) {
        formWeight1.style.display = 'none';
        formWeight2.style.display = 'block';
        weightLabel.textContent = "Weight 2";
        isWeight2Selected = true;
    }
    console.log(isWeight2Selected);
}

// Default is Weight 1 selected
formWeight1.style.display = 'block';
formWeight2.style.display = 'none';
weightLabel.textContent = "Weight 1";

// panggil fungsi weight radio button
radioWeight1.addEventListener('change', handleRadioChange);
radioWeight2.addEventListener('change', handleRadioChange);

// fungsi unk jadiin decimal
function parseDecimal(value) {
    let parsedValue = parseFloat(value.replace(',', '.'));

    if (isNaN(parsedValue)) {
        return 0.00;
    }

    return parsedValue.toFixed(2);
}

inputs1.forEach(input => {
    input.addEventListener('change', calculateWeight);
});
inputs2.forEach(input => {
    input.addEventListener('change', calculateWeight);
});
// hitung weight
function calculateWeight() {
    let parsedInputs1 = inputs1.map(input => parseDecimal(input.value));
    let parsedInputs2 = inputs2.map(input => parseDecimal(input.value));

    if (isWeight2Selected) {
        if (parsedInputs2.every(value => !isNaN(value))) {
            let weight = parsedInputs2[0] * parsedInputs2[1] * ((parsedInputs2[2] * parsedInputs2[3]) + (parsedInputs2[4] * parsedInputs2[5])) / 1143000 / 2;
            weight = Math.round(weight * 10) / 10;
            weight2.value = weight.toFixed(2);
            weight1.value = '0.00'; // ensure it's set to string '0.00'
        } else {
            weight2.value = '';
        }
    } else {
        if (parsedInputs1.every(value => !isNaN(value))) {
            let weight = parsedInputs1[0] * parsedInputs1[1] * ((parsedInputs1[2] * parsedInputs1[3]) + (parsedInputs1[4] * parsedInputs1[5])) / 1143000 / 2;
            weight = Math.round(weight * 10) / 10;
            weight1.value = weight.toFixed(2);
            weight2.value = '0.00'; // ensure it's set to string '0.00'
        } else {
            weight1.value = '';
        }
    }
}


// cek checkbox
// fungsi track aktifitas checkbox
function setupCheckboxListeners() {
    sections.forEach(function (section) {
        section.checkboxes.forEach(function (checkboxName) {
            var checkbox = document.querySelector(`#${section.id} input[name="${checkboxName}"]`);
            if (checkbox) {
                checkbox.addEventListener('change', function (event) {
                    handleCheckboxChange(section.id);
                });
            }
        });
    });
}

// fungsi dapetin nilai checkbox
function handleCheckboxChange(sectionId) {
    var section = document.getElementById(sectionId);
    var checkedName = null;

    // Find the first checked checkbox value for the section
    sections.find(s => s.id === sectionId).checkboxes.some(function (checkboxName) {
        var checkbox = section.querySelector(`input[name="${checkboxName}"]`);
        if (checkbox && checkbox.checked) {
            checkedName = checkboxName;
            return true;
        }
    });

    // simpan nilai checkbox
    switch (sectionId) {
        case 'jenis':
            jenis = checkedName ? [checkedName] : [];
            break;
        case 'sewingMethod':
            sewing = checkedName ? [checkedName] : [];
            break;
        case 'stitchApprox':
            stitch = checkedName ? [checkedName] : [];
            break;
        case 'fitDraw':
            draw = checkedName ? [checkedName] : [];
            break;
        default:
            break;
    }
    centangCheck = [sewing.length, stitch.length, draw.length];

    // console.log(jenis);
    // console.log(sewing);
    // console.log(stitch);
    // console.log(draw);
}

// panggil fungsi cek checkbox
setupCheckboxListeners();


// fungsi cek semua form yang kosong
function allInputsFilled() {
    for (const input of inputAll) {
        if (input.value.trim() === '') {
            // membiarkan input weight tidak terpilih exclude dari inputAll
            if (isWeight2Selected) {
                selectWeight = !inputIds1.includes(input.id);
            } else {
                selectWeight = !inputIds2.includes(input.id);
            }


            // skip input pada div id
            if (input.closest('#jenis, #sewingMethod, #stitchApprox, #fitDraw')) {
                continue
            } else if (inputsInBagDetail.disabled && input.id !== 'No.' && input.id !== 'refNo' && selectWeight) {
                let label = '';
                let parentElement = input.parentElement;
                while (parentElement) {
                    if (parentElement.tagName === 'DIV' && parentElement.classList.contains('form-group')) {
                        label = parentElement.querySelector('label[for="' + input.id + '"]');
                        if (label) {
                            label = label.innerText.trim();
                            break;
                        }
                    }
                    parentElement = parentElement.parentElement;
                }

                if (label) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Inputkan ${label} Terlebih Dahulu!`,
                        returnFocus: false
                    }).then(() => {
                        input.focus();
                    });
                    return false;
                }
            } else if (input.id == 'No.') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Inputkan No Reference Terlebih Dahulu!`,
                    returnFocus: false
                }).then(() => {
                    No.focus();
                });
                return false;
            } else if (input.id == 'refNo') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Lengkapi Data No Reference Terlebih Dahulu!`,
                    returnFocus: false
                }).then(() => {
                    refNo.focus();
                });
                return false;
            }
        }
    }
    return true;
}

var Ketik = document.querySelectorAll('input');

// fungsi bisa ketik
function enableKetik() {
    Ketik.forEach(function (input) {
        input.value = '';
        input.disabled = false;
    });
    inputsInBagDetail.forEach(function (input) { // menutup input pada div bag detail
        input.disabled = true;
    });

    // hide button isi, tampilkan button simpan
    btn_isi.style.display = 'none';
    btn_simpan.style.display = 'inline-block';
    // hide button koreksi, tampilkan button batal
    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';

    btn_RefNo.disabled = false;
    btn_BagCode.disabled = false;

    radioWeight1.disabled = false;
    radioWeight2.disabled = false;
}

// fungsi gak bisa ketik
function disableKetik() {
    Ketik.forEach(function (input) {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
            input.disabled = true;
        } else {
            input.value = '';
            input.disabled = true;
        }
    });

    btn_simpan.style.display = 'none';
    btn_isi.style.display = 'inline-block';

    btn_batal.style.display = 'none';
    btn_koreksi.style.display = 'inline-block';

    btn_RefNo.disabled = true;
    btn_BagCode.disabled = true;

    radioWeight1.disabled = true;
    radioWeight2.disabled = true;

    btn_hapus.disabled = false;
}

// Button isi event listener
btn_isi.addEventListener('click', function () {
    a = 1;
    enableKetik();
    tanggal.value = todayString;
    tahun.value = new Date(tanggal.value).getFullYear();
    prodDate.value = todayString;
    testingDate.value = todayString;

    // tahun mengikuti tanggal
    tanggal.addEventListener('change', function () {
        var selectedDate = new Date(tanggal.value);
        var selectedYear = selectedDate.getFullYear();
        tahun.value = selectedYear;
    });
    tanggal.focus();

    btn_RefNo.disabled = true;
    btn_BagCode.disabled = false;
    btn_hapus.disabled = true;

    sewingDetail.forEach(function (input) {
        input.disabled = false;
    });

    stitchDetail.forEach(function (input) {
        input.disabled = false;
    });

    drawDetail.forEach(function (input) {
        input.disabled = false;
    });

});

// Button batal event listener
btn_batal.addEventListener('click', function () {
    btn_hapus.disabled = false;
    disableKetik();
});

// Initially disable Ketik on page load
disableKetik();

// button koreksi
btn_koreksi.addEventListener("click", function (e) {
    a = 2;
    btn_isi.style.display = 'none';
    btn_simpan.style.display = 'inline-block';

    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';

    btn_RefNo.disabled = false;
    btn_hapus.disabled = true;
    btn_RefNo.focus()

});

// button hapus
btn_hapus.addEventListener("click", function (e) {
    a = 3;

    btn_isi.style.display = 'none';
    btn_simpan.style.display = 'inline-block';

    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';

    btn_RefNo.disabled = false;
    btn_hapus.disabled = true;
    btn_RefNo.focus()
});

// atribut parse
let parsedSwl = parseDecimal(swl.value);
let parsedSf = parseDecimal(sf.value);

// button simpan
btn_simpan.addEventListener('click', async function (e) {
    if (a === 1) { // ISI
        inputsInBagDetail.forEach(function (input) {
            input.disabled = false;
        });

        try {
            e.preventDefault();

            if (tanggal.valueAsDate > today) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Tanggal Lebih Besar Dari Tanggal Sekarang`,
                    returnFocus: false
                }).then(() => {
                    tanggal.focus();
                });
                return;
            }

            if (!allInputsFilled()) {
                return;
            }

            fixRefNo = No.value + "/KRR-QC/" + refNo.value + "/" + tahun.value;

            parsedInputs1 = inputs1.map(input => parseDecimal(input.value));
            parsedInputs2 = inputs2.map(input => parseDecimal(input.value));

            if (jenis.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Pilih Jenis FIBC Terlebih Dahulu !`,
                    returnFocus: false
                }).then(() => {
                    document.getElementById("sample").focus();
                });
                return;
            }

            // konvert array jadi string
            let jenisString = jenis.join(', ');
            let sewingString = sewing.join(', ');
            let stitchString = stitch.join(', ');
            let drawString = draw.join(', ');

            // konfirmasi checkbox sewing, stitch, fit to draw
            let jenisText = ['Sewing Method', 'Stitch Approx', 'Fit to Drawing Spec.'];
            let tidakTercentang = [];

            centangCheck.forEach(function (length, index) {
                if (length === 0) {
                    tidakTercentang.push(index);
                }
            });

            if (tidakTercentang.length > 0) {
                let currentIndex = 0;

                async function showSweetAlert() {
                    let index = tidakTercentang[currentIndex];
                    let questionText = `Apakah Data ${jenisText[index]} Mau Anda Lengkapi?`;

                    await Swal.fire({
                        icon: 'question',
                        text: questionText,
                        showCancelButton: true,
                        confirmButtonText: 'Ya',
                        cancelButtonText: 'Tidak'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            return;
                        } else {
                            currentIndex++;
                            if (currentIndex < tidakTercentang.length) {
                                disableInputs();
                                showSweetAlert();
                            } else {
                                submitForm(jenisString, sewingString, stitchString, drawString)
                                return;
                            }
                        }
                    });
                }
                disableInputs();
                await showSweetAlert();
            } else {
                submitForm(jenisString, sewingString, stitchString, drawString);
            }

        } catch (error) {
            console.error('Exception:', error);
        }
    } else if (a === 2) { // KOREKSI
        try {
            e.preventDefault();

            if (!allInputsFilled()) {
                return;
            }

            parsedInputs1 = inputs1.map(input => parseDecimal(input.value));
            parsedInputs2 = inputs2.map(input => parseDecimal(input.value));

            // konvert array jadi string
            let jenisString = jenis.join(', ');
            let sewingString = sewing.join(', ');
            let stitchString = stitch.join(', ');
            let drawString = draw.join(', ');
            // console.log(jenis);
            // console.log(sewing);
            // console.log(stitch);
            // console.log(draw);

            koreksiFIBC(jenisString, sewingString, stitchString, drawString);

        } catch (error) {
            console.error('Exception:', error);
        }
    } else if (a === 3) { //HAPUS
        $.ajax({
            url: "FrmInputFIBC/hapusDetailFIBC",
            type: "DELETE",
            data: {
                _token: csrfToken,
                no_ref: splitRefNo
            },
            timeout: 30000,
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data Telah Terhapus',
                    }).then(() => {
                        disableKetik();
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('AJAX Error:', error);
                console.log('Response Status:', status);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Data Gagal Terhapus',
                });
            }
        });
    }
});

let inputStates = {};

// Function to disable inputs
function disableInputs() {
    inputs.forEach(masuk => {
        inputStates[masuk.id] = masuk.disabled; // Track initial disabled state
        masuk.disabled = true; // Disable the input
    });
}

// Function to enable inputs based on initial state tracking
function enableInputs() {
    inputs.forEach(masuk => {
        if (!inputStates.hasOwnProperty(masuk.id) || !inputStates[masuk.id]) {
            masuk.disabled = false; // Enable the input if it was not disabled initially
        }
    });
}


// fungsi unk submit isi
async function submitForm(jenisString, sewingString, stitchString, drawString) {
    $.ajax({
        type: 'POST',
        url: 'FrmInputFIBC',
        data: {
            _token: csrfToken,
            tanggal: tanggal.value,
            fixRefNo: fixRefNo.trim(),
            customer: customer.value.trim(),
            bagCode: bagCode.value.trim(),
            bagType: bagType.value.trim(),
            poNo: poNo.value.trim(),
            prodDate: prodDate.value,
            testingDate: testingDate.value,
            size: size.value.trim(),
            reinforced: reinforced.value.trim(),
            colour: colour.value.trim(),

            panjang1: parsedInputs1[0] !== undefined ? parsedInputs1[0].toFixed(2) : '0.00',
            lebar1: parsedInputs1[1] !== undefined ? parsedInputs1[1].toFixed(2) : '0.00',
            waft1: parsedInputs1[2] !== undefined ? parsedInputs1[2].toFixed(2) : '0.00',
            denierWaft1: parsedInputs1[3] !== undefined ? parsedInputs1[3].toFixed(2) : '0.00',
            weft1: parsedInputs1[4] !== undefined ? parsedInputs1[4].toFixed(2) : '0.00',
            denierWeft1: parsedInputs1[5] !== undefined ? parsedInputs1[5].toFixed(2) : '0.00',
            weight1: weight1.value ? weight1.value.trim() : 0.00,

            swl: swl.value.trim(),
            sf: sf.value.trim(),
            jenis: jenisString.trim(),
            liftBeltType: liftBeltType.value.trim(),
            sewingThreadType: sewingThreadType.value.trim(),
            sewing: sewingString.trim(),
            stitch: stitchString.trim(),
            draw: drawString.trim(),

            panjang2: parsedInputs2[0] !== undefined ? parsedInputs2[0].toFixed(2) : '0.00',
            lebar2: parsedInputs2[1] !== undefined ? parsedInputs2[1].toFixed(2) : '0.00',
            waft2: parsedInputs2[2] !== undefined ? parsedInputs2[2].toFixed(2) : '0.00',
            denierWaft2: parsedInputs2[3] !== undefined ? parsedInputs2[3].toFixed(2) : '0.00',
            weft2: parsedInputs2[4] !== undefined ? parsedInputs2[4].toFixed(2) : '0.00',
            denierWeft2: parsedInputs2[5] !== undefined ? parsedInputs2[5].toFixed(2) : '0.00',
            weight2: weight2.value ? weight2.value.trim() : 0.00,

            topS1: topS1.value.trim(),
            topS2: topS2.value.trim(),
            topS3: topS3.value.trim(),
            topS4: topS4.value.trim(),
            topS5: topS5.value.trim(),
            topE1: topE1.value.trim(),
            topE2: topE2.value.trim(),
            topE3: topE3.value.trim(),
            topE4: topE4.value.trim(),
            topE5: topE5.value.trim(),
            bottomS1: bottomS1.value.trim(),
            bottomS2: bottomS2.value.trim(),
            bottomS3: bottomS3.value.trim(),
            bottomS4: bottomS4.value.trim(),
            bottomS5: bottomS5.value.trim(),
            bottomE1: bottomE1.value.trim(),
            bottomE2: bottomE2.value.trim(),
            bottomE3: bottomE3.value.trim(),
            bottomE4: bottomE4.value.trim(),
            bottomE5: bottomE5.value.trim(),
            Copy_RefNo: Copy_RefNo,
        },
        timeout: 30000,
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data Telah Tersimpan',
                }).then(() => {
                    disableKetik();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Data Belum Lengkap Terisi',
            });
        }
    });
}

// fungsi unk submit koreksi
async function koreksiFIBC(jenisString, sewingString, stitchString, drawString) {
    console.log(bottomE5.value);

    $.ajax({
        url: "FrmInputFIBC/koreksiDetailFIBC",
        type: "PUT",
        data: {
            _token: csrfToken,
            tanggal: tanggal.value,
            fixRefNo: fixRefNo.trim(),
            customer: customer.value.trim(),
            bagCode: bagCode.value.trim(),
            bagType: bagType.value.trim(),
            poNo: poNo.value.trim(),
            prodDate: prodDate.value,
            testingDate: testingDate.value,
            size: size.value.trim(),
            reinforced: reinforced.value.trim(),
            colour: colour.value.trim(),

            panjang1: parsedInputs1[0] !== undefined ? parsedInputs1[0].toFixed(2) : '0.00',
            lebar1: parsedInputs1[1] !== undefined ? parsedInputs1[1].toFixed(2) : '0.00',
            waft1: parsedInputs1[2] !== undefined ? parsedInputs1[2].toFixed(2) : '0.00',
            denierWaft1: parsedInputs1[3] !== undefined ? parsedInputs1[3].toFixed(2) : '0.00',
            weft1: parsedInputs1[4] !== undefined ? parsedInputs1[4].toFixed(2) : '0.00',
            denierWeft1: parsedInputs1[5] !== undefined ? parsedInputs1[5].toFixed(2) : '0.00',
            weight1: weight1.value ? weight1.value.trim() : '0.00',

            swl: swl.value.trim(),
            sf: sf.value.trim(),
            jenis: jenisString.trim(),
            liftBeltType: liftBeltType.value.trim(),
            sewingThreadType: sewingThreadType.value.trim(),
            sewing: sewingString.trim(),
            stitch: stitchString.trim(),
            draw: drawString.trim(),

            panjang2: parsedInputs2[0] !== undefined ? parsedInputs2[0].toFixed(2) : '0.00',
            lebar2: parsedInputs2[1] !== undefined ? parsedInputs2[1].toFixed(2) : '0.00',
            waft2: parsedInputs2[2] !== undefined ? parsedInputs2[2].toFixed(2) : '0.00',
            denierWaft2: parsedInputs2[3] !== undefined ? parsedInputs2[3].toFixed(2) : '0.00',
            weft2: parsedInputs2[4] !== undefined ? parsedInputs2[4].toFixed(2) : '0.00',
            denierWeft2: parsedInputs2[5] !== undefined ? parsedInputs2[5].toFixed(2) : '0.00',

            weight2: weight2.value ? weight2.value.trim() : '0.00',

            topS1: topS1.value.trim(),
            topS2: topS2.value.trim(),
            topS3: topS3.value.trim(),
            topS4: topS4.value.trim(),
            topS5: topS5.value.trim(),
            topE1: topE1.value.trim(),
            topE2: topE2.value.trim(),
            topE3: topE3.value.trim(),
            topE4: topE4.value.trim(),
            topE5: topE5.value.trim(),
            bottomS1: bottomS1.value.trim(),
            bottomS2: bottomS2.value.trim(),
            bottomS3: bottomS3.value.trim(),
            bottomS4: bottomS4.value.trim(),
            bottomS5: bottomS5.value.trim(),
            bottomE1: bottomE1.value.trim(),
            bottomE2: bottomE2.value.trim(),
            bottomE3: bottomE3.value.trim(),
            bottomE4: bottomE4.value.trim(),
            bottomE5: bottomE5.value.trim(),
            Copy_RefNo: Copy_RefNo.trim(),
        },
        timeout: 30000,
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data Telah Terkoreksi',
                }).then(() => {
                    disableKetik();
                });
            }
        },
        error: function (xhr, status, error) {
            console.error('AJAX Error:', error);
            console.log('Response Status:', status);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Data Gagal Terkoreksi',
            });
        }
    });

}


