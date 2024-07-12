var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var tanggal = document.getElementById('tanggal');
var currentDate = new Date();
var year = document.getElementById('year');

// button
var btn_RefNo = document.getElementById('btn_RefNo');
var btn_BagCode = document.getElementById('btn_BagCode');

var btn_isi = document.getElementById('btn_isi');
var btn_simpan = document.getElementById('btn_simpan');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

//weight form
var radioWeight1 = document.getElementById('radioWeight1');
var radioWeight2 = document.getElementById('radioWeight2');
var weightLabel = document.getElementById('weightLabel');

// attribut
var No = document.getElementById('No');
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

var inputIds1 = ['panjang1', 'lebar1', 'waft1', 'denierWaft1', 'weft1', 'denierWeft1'];
var inputs1 = inputIds1.map(id => document.getElementById(id));
var weight1 = document.getElementById('weight1');

var inputIds2 = ['panjang2', 'lebar2', 'waft2', 'denierWaft2', 'weft2', 'denierWeft2'];
var inputs2 = inputIds2.map(id => document.getElementById(id));
var weight2 = document.getElementById('weight2');

var fixRefNo = '';
let jenis = [];
var sewing = [];
var stitch = [];
var draw = [];
var centangCheck = [];

var bagDetailDiv = document.getElementById('bag_detail');
var inputsInBagDetail = bagDetailDiv.querySelectorAll('input');

var sewingMethodDiv = document.getElementById('sewingMethod');
var sewingDetail = sewingMethodDiv.querySelectorAll('input');

var stitchApproxDiv = document.getElementById('stitchApprox');
var stitchDetail = stitchApproxDiv.querySelectorAll('input');

var fitDrawDiv = document.getElementById('fitDraw');
var drawDetail = fitDrawDiv.querySelectorAll('input');

const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly])'));
const inputAll = Array.from(document.querySelectorAll('.card-body input[type="text"]'));

const notReq = [
    'topS1', 'topS2', 'topS3', 'topS4', 'topS5',
    'topE1', 'topE2', 'topE3', 'topE4', 'topE5',
    'bottomS1', 'bottomS2', 'bottomS3', 'bottomS4', 'bottomS5',
    'bottomE1', 'bottomE2', 'bottomE3', 'bottomE4', 'bottomE5'
];

inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            // console.log(masuk.id);
            if (masuk.value.trim() === '') {
                event.preventDefault();

                if (masuk.id === 'po-no') {
                    masuk.value = 'UNKNOWN';
                } else {
                    if (index < inputs.length - 1) {
                        inputs[index + 1].focus();
                        // console.log(masuk.value);
                    }
                }


            } else if (masuk.id === 'denierWeft1' || masuk.id === 'denierWeft2') {
                liftBeltType.focus();
                inputsInBagDetail.forEach(function (input) {
                    input.disabled = false;
                });

            } else if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        }
    });
});


// get year
function getYearFromInput() {
    var inputDate = new Date(tanggal.value);

    if (isNaN(inputDate.getTime())) {
        console.error('Format tanggal tidak valid');
        return;
    }

    year.value = inputDate.getFullYear();
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

                let splitRefNo = selectedRow.Reference_No.trim();

                let parts = splitRefNo.split("/");
                let extractedNo = parts[0];
                let extractedRefNo = parts[2];

                No.value = extractedNo;
                refNo.value = extractedRefNo;

                $.ajax({
                    url: "FrmInputFIBC/getDataDetailReference",
                    type: "GET",
                    data: {
                        _token: csrfToken,
                        no_ref: splitRefNo
                    },
                    success: function (result) {

                        console.log(splitRefNo);


                        customer.value = result[0].Customer.trim();
                        bagCode.value = result[0].Bag_Code.trim();
                        bagType.value = result[0].Bag_Type.trim();
                        poNo.value = result[0].PO_No.trim();
                        prodDate.value = result[0].Tanggal_Prod.trim();
                        testingDate.value = result[0].Tanggal_Testing.trim();
                        size.value = result[0].Size.trim();
                        reinforced.value = result[0].Reinforced.trim();
                        colour.value = result[0].Colour.trim();
                        swl.value = result[0].SWL.trim();
                        sf.value = result[0].sf.trim();
                        liftBeltType.value = result[0].LiftingBelt_Type.trim();
                        sewingThreadType.value = result[0].SewingThread_Type.trim();
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

                        inputs1[0].value = result[0].Panjang.trim();
                        inputs1[1].value = result[0].Lebar.trim();
                        inputs1[2].value = result[0].Waft.trim();
                        inputs1[3].value = result[0].Denier_Waft.trim();
                        inputs1[4].value = result[0].Weft.trim();
                        inputs1[5].value = result[0].Denier_Weft.trim();
                        weight1.value = result[0].Weight.trim();

                        inputs2[0].value = result[0].Panjang2.trim();
                        inputs2[1].value = result[0].Lebar2.trim();
                        inputs2[2].value = result[0].Waft2.trim();
                        inputs2[3].value = result[0].Denier_Waft2.trim();
                        inputs2[4].value = result[0].Weft2.trim();
                        inputs2[5].value = result[0].Denier_Weft2.trim();
                        weight2.value = result[0].Weight2.trim();
                    }
                });
            }
        });
    } catch (error) {
        console.error("An error occurred:", error);
    }
});

// bag code
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
                selectBageCode(result.value.Bag_Code);
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function selectBageCode(Bag_Code) {
    document.getElementById("bag-code").value = Bag_Code;
    Swal.close();
}

let isWeight1Selected = true; // Default is Weight 1 selected

// weight radio button
function setupWeightRadio() {
    document.querySelectorAll('input[name="weight"]').forEach(function (radio) {
        radio.addEventListener('change', function () {
            if (radio.checked) {
                if (radio.value === 'radioWeight2') {
                    document.getElementById('formWeight1').style.display = 'none';
                    document.getElementById('formWeight2').style.display = 'block';
                    weightLabel.textContent = "Weight 2";
                    isWeight1Selected = false;
                } else {
                    document.getElementById('formWeight1').style.display = 'block';
                    document.getElementById('formWeight2').style.display = 'none';
                    weightLabel.textContent = "Weight 1";
                    isWeight1Selected = true;
                }
                console.log(isWeight1Selected);
            }
        });
    });
    weightLabel.textContent = "Weight 1";
    return isWeight1Selected;
}

// panggil fungsi weight radio button
setupWeightRadio();


// cek checkbox
var sections = [
    { id: 'jenis', checkboxes: ['sample', 'pre-production', 'production', 'spec-modification', 'trial', 'customer-sample'] },
    { id: 'sewingMethod', checkboxes: ['Mitsumaki', 'HalfMitsumaki', 'Ogami', 'Other'], },
    { id: 'stitchApprox', checkboxes: ['Bottom', 'Side', 'Lift'] },
    { id: 'fitDraw', checkboxes: ['Yesfit', 'Nofit'] }
];

// fungsi track aktifitas checkbox
function setupCheckboxListeners() {
    sections.forEach(function (section) {
        section.checkboxes.forEach(function (checkboxName) {
            var checkbox = document.querySelector(`#${section.id} input[name="${checkboxName}"]`);
            if (checkbox) {
                checkbox.addEventListener('change', function (event) {
                    handleCheckboxChange(section.id);
                });
            } else {
                console.error(`Checkbox ${checkboxName} not found in section ${section.id}`);
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


// cek form yang kosong
function allInputsFilled() {
    for (const input of inputAll) {
        if (input.value.trim() === '') {
            // membiarkan input weight tidak terpilih exclude dari inputAll
            if (isWeight1Selected) {
                selectWeight = !inputIds2.includes(input.id);
                // inputs2.value = '';
            } else {
                selectWeight = !inputIds1.includes(input.id);
                // inputs1.value = '';
            }

            // // kalau form bag detail tidak kebuka, exclude dari notif semua inputnya
            // if (inputsInBagDetail.disabled && (input.id === 'liftBeltType' || input.id === 'sewingThreadType')) {
            //     input.value = null;
            //     continue;
            // }

            // skip input pada div id
            if (input.closest('#jenis, #sewingMethod, #stitchApprox, #fitDraw')) {
                continue
            } else if (inputsInBagDetail.disabled && input.id !== 'No' && input.id !== 'refNo' && input.id !== 'weight1' && input.id !== 'weight2' && selectWeight) {
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
            } else if (input.id == 'No') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Inputkan No Reference Terlebih Dahulu!`,
                    returnFocus: false
                }).then(() => {
                    input.focus();
                });
                return false;
            } else if (input.id == 'refNo') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: `Lengkapi Data No Reference Terlebih Dahulu!`,
                    returnFocus: false
                }).then(() => {
                    input.focus();
                });
                return false;
            }
        }
    }
    return true;
}

// hitung weight
function calculateWeight() {
    var input1Values = inputs1.map(input1 => parseFloat(input1.value));
    var input2Values = inputs2.map(input2 => parseFloat(input2.value));

    if (isWeight1Selected) {
        if (input1Values.every(value => !isNaN(value))) {
            var weight = input1Values[0] * input1Values[1] * ((input1Values[2] * input1Values[3]) + (input1Values[4] * input1Values[5])) / 1143000 / 2;
            weight = Math.round(weight * 10) / 10;

            weight1.value = weight;
            input2Values.every(value => value == '')
        } else {
            weight1.value = '';
        }
    } else {

        if (input2Values.every(value => !isNaN(value))) {
            var weight = input2Values[0] * input2Values[1] * ((input2Values[2] * input2Values[3]) + (input2Values[4] * input2Values[5])) / 1143000 / 2;
            weight = Math.round(weight * 10) / 10;

            weight2.value = weight;
            input1Values.every(value => value == '')
        } else {
            weight2.value = '';
        }
    }
}

// panggil function hitung weight
inputs1.forEach(input => input.addEventListener('input', calculateWeight));
inputs2.forEach(input => input.addEventListener('input', calculateWeight));

function parseDecimal(value) {
    // Remove commas if present and parse to float with 2 decimal places
    return parseFloat(value.replace(/,/g, '')).toFixed(2);
}



// button enable disable input sesuai button isi & batal
document.addEventListener('DOMContentLoaded', function () {
    btn_RefNo.disabled = true;
    btn_BagCode.disabled = true;

    btn_simpan.style.display = 'none';
    btn_batal.style.display = 'none';

    var Ketik = document.querySelectorAll('input');

    // fungsi bisa ketik
    function enableKetik() {
        Ketik.forEach(function (input) { // membuka semua input
            input.disabled = false;
        });
        inputsInBagDetail.forEach(function (input) { // menutup input pada div bag detail
            input.disabled = true;
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

        btn_isi.style.display = 'none';
        btn_simpan.style.display = 'inline-block';

        btn_koreksi.style.display = 'none';
        btn_batal.style.display = 'inline-block';

        btn_RefNo.disabled = false;
        btn_BagCode.disabled = false;
    }

    // fungsi gak bisa ketik
    function disableKetik() {
        Ketik.forEach(function (input) {
            if (input.type !== 'radio') { // Exclude radio buttons from being disabled
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
    }

    // Button isi event listener
    btn_isi.addEventListener('click', function () {
        enableKetik();
        btn_RefNo.disabled = true;
        btn_BagCode.disabled = true;
        tanggal.focus();
    });

    // Button batal event listener
    btn_batal.addEventListener('click', function () {
        disableKetik();
    });

    // Initially disable Ketik on page load
    disableKetik();
});

// Function to log all HTML elements with their information
function logAllElements() {
    let info = {
        tanggal: tanggal.value,
        fixRefNo: fixRefNo,
        customer: customer.value,
        bagCode: bagCode.value,
        bagType: bagType.value,
        poNo: poNo.value,
        prodDate: prodDate.value,
        testingDate: testingDate.value,
        size: size.value,
        reinforced: reinforced.value,
        colour: colour.value,
        panjang1: inputs1[0].value,
        lebar1: inputs1[1].value,
        waft1: inputs1[2].value,
        denierWaft1: inputs1[3].value,
        weft1: inputs1[4].value,
        denierWeft1: inputs1[5].value,
        weight1: weight1.value,
        swl: swl.value,
        sf: sf.value,
        jenis: jenis,
        liftBeltType: liftBeltType.value,
        sewingThreadType: sewingThreadType.value,
        sewing: sewing,
        stitch: stitch,
        draw: draw,
        currentDate: currentDate,
        panjang2: inputs2[0].value,
        lebar2: inputs2[1].value,
        waft2: inputs2[2].value,
        denierWaft2: inputs2[3].value,
        weft2: inputs2[4].value,
        denierWeft2: inputs2[5].value,
        weight2: weight2.value,
        topS1: topS1.value,
        topS2: topS2.value,
        topS3: topS3.value,
        topS4: topS4.value,
        topS5: topS5.value,
        topE1: topE1.value,
        topE2: topE2.value,
        topE3: topE3.value,
        topE4: topE4.value,
        topE5: topE5.value,
        bottomS1: bottomS1.value,
        bottomS2: bottomS2.value,
        bottomS3: bottomS3.value,
        bottomS4: bottomS4.value,
        bottomS5: bottomS5.value,
        bottomE1: bottomE1.value,
        bottomE2: bottomE2.value,
        bottomE3: bottomE3.value,
        bottomE4: bottomE4.value,
        bottomE5: bottomE5.value
    };
    console.log(info);
    console.log("ini di dalam log all element");

    let hasUndefinedOrNullValue = Object.values(info).some(value => value === undefined || value === null);

    if (hasUndefinedOrNullValue) {
        console.log("One or more values are undefined or null.");
        // Handle the error condition appropriately
        return; // Or perform any necessary action
    } else {
        console.log("gak ada masalah");
        console.log(hasUndefinedOrNullValue);
    }
}

// Event listener for button click
const jenisText = ['Sewing Method', 'Stitch Approx', 'Fit to Drawing Spec.'];
btn_simpan.addEventListener('click', async function (e) {
    try {
        e.preventDefault();

        // Validation checks
        if (tanggal.value === '') {
            await showErrorAlert('Tanggal tidak boleh kosong', tanggal);
            return;
        }

        if (tanggal.valueAsDate > currentDate) {
            await showErrorAlert('Tanggal Lebih Besar Dari Tanggal Sekarang', tanggal);
            return;
        }

        if (!allInputsFilled()) {
            return;
        }

        // Generate fixRefNo
        fixRefNo = `${No.value}/KRR-QC/${refNo.value}/${year.value}`;

        if (jenis.length === 0) {
            await showErrorAlert('Pilih Jenis FIBC Terlebih Dahulu !', document.getElementById("sample"));
            return;
        }

        // Confirm checkboxes
        const tidakTercentang = centangCheck.map((length, index) => length === 0 ? index : -1).filter(index => index !== -1);

        if (tidakTercentang.length > 0) {
            await confirmCheckboxes(tidakTercentang);
        }

        const Panjang = parseDecimal(inputs1[0].value);
        const Lebar = parseDecimal(inputs1[1].value);
        const Waft = parseDecimal(inputs1[2].value);
        const Weft = parseDecimal(inputs1[3].value);
        const Denier_Waft = parseDecimal(inputs1[4].value);
        const Denier_Weft = parseDecimal(inputs1[5].value);
        const Weight = parseDecimal(weight1.value);
        const Panjang2 = parseDecimal(inputs2[0].value);
        const Lebar2 = parseDecimal(inputs2[1].value);
        const Waft2 = parseDecimal(inputs2[2].value);
        const Weft2 = parseDecimal(inputs2[3].value);
        const Denier_Waft2 = parseDecimal(inputs2[4].value);
        const Denier_Weft2 = parseDecimal(inputs2[5].value);
        const Weight2 = parseDecimal(weight2.value);
        const SWL = parseDecimal(swl.value);
        const SF = parseDecimal(sf.value);
        const Top_KG_1 = parseDecimal(topS1.value);
        const Top_KG_2 = parseDecimal(topS2.value);
        const Top_KG_3 = parseDecimal(topS3.value);
        const Top_KG_4 = parseDecimal(topS4.value);
        const Top_KG_5 = parseDecimal(topS5.value);
        const Top_Persen_1 = parseDecimal(topE1.value);
        const Top_Persen_2 = parseDecimal(topE2.value);
        const Top_Persen_3 = parseDecimal(topE3.value);
        const Top_Persen_4 = parseDecimal(topE4.value);
        const Top_Persen_5 = parseDecimal(topE5.value);
        const Bottom_KG_1 = parseDecimal(bottomS1.value);
        const Bottom_KG_2 = parseDecimal(bottomS2.value);
        const Bottom_KG_3 = parseDecimal(bottomS3.value);
        const Bottom_KG_4 = parseDecimal(bottomS4.value);
        const Bottom_KG_5 = parseDecimal(bottomS5.value);
        const Bottom_Persen_1 = parseDecimal(bottomE1.value);
        const Bottom_Persen_2 = parseDecimal(bottomE2.value);
        const Bottom_Persen_3 = parseDecimal(bottomE3.value);
        const Bottom_Persen_4 = parseDecimal(bottomE4.value);
        const Bottom_Persen_5 = parseDecimal(bottomE5.value);

        fixRefNo = `${No.value}/KRR-QC/${refNo.value}/${year.value}`;

        await submitForm({
            tanggal: tanggal.value,
            fixRefNo: fixRefNo,
            customer: customer.value,
            bagCode: bagCode.value,
            bagType: bagType.value,
            poNo: poNo.value,
            prodDate: prodDate.value,
            testingDate: testingDate.value,
            size: size.value,
            reinforced: reinforced.value,
            colour: colour.value,
            panjang1: Panjang,
            lebar1: Lebar,
            waft1: Waft,
            denierWaft1: Denier_Waft,
            weft1: Weft,
            denierWeft1: Denier_Weft,
            weight1: Weight,
            swl: SWL,
            sf: SF,
            jenis: jenis,
            liftBeltType: liftBeltType.value,
            sewingThreadType: sewingThreadType.value,
            sewing: sewing,
            stitch: stitch,
            draw: draw,
            currentDate: currentDate,
            panjang2: Panjang2,
            lebar2: Lebar2,
            waft2: Waft2,
            denierWaft2: Denier_Waft2,
            weft2: Weft2,
            denierWeft2: Denier_Weft2,
            weight2: Weight2,
            topS1: Top_KG_1,
            topS2: Top_KG_2,
            topS3: Top_KG_3,
            topS4: Top_KG_4,
            topS5: Top_KG_5,
            topE1: Top_Persen_1,
            topE2: Top_Persen_2,
            topE3: Top_Persen_3,
            topE4: Top_Persen_4,
            topE5: Top_Persen_5,
            bottomS1: Bottom_KG_1,
            bottomS2: Bottom_KG_2,
            bottomS3: Bottom_KG_3,
            bottomS4: Bottom_KG_4,
            bottomS5: Bottom_KG_5,
            bottomE1: Bottom_Persen_1,
            bottomE2: Bottom_Persen_2,
            bottomE3: Bottom_Persen_3,
            bottomE4: Bottom_Persen_4,
            bottomE5: Bottom_Persen_5
        });

    } catch (error) {
        console.error('Exception:', error);
    }
});

// Function to show error alert and focus on input
async function showErrorAlert(message, focusElement) {
    await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        returnFocus: false
    }).then(() => {
        if (focusElement) {
            focusElement.focus();
        }
    });
}

// Function to confirm checkboxes
async function confirmCheckboxes(tidakTercentang) {
    let currentIndex = 0;

    async function showSweetAlert() {
        const index = tidakTercentang[currentIndex];
        const questionText = `Apakah Data ${jenisText[index]} Mau Anda Lengkapi?`;

        await Swal.fire({
            icon: 'question',
            text: questionText,
            showCancelButton: true,
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then(async (result) => {
            if (result.isConfirmed) {
                return;
            } else {
                currentIndex++;
                if (currentIndex < tidakTercentang.length) {
                    await showSweetAlert();
                } else {
                    await submitForm();
                    console.log("kembali keluar if");
                    return;
                }
            }
        });
    }

    await showSweetAlert();
}

// Function to submit form
async function submitForm() {
    logAllElements;
    try {
        const response = await $.ajax({
            type: 'POST',
            url: 'FrmInputFIBC',
            data: {
                _token: csrfToken,
                ...data
            },
            timeout: 30000
        });

        if (response.success) {
            await Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data Telah Tersimpan',
            });

            // Clear input fields if needed
            inputAll.forEach(input => { input.value = ''; });
        }
    } catch (error) {
        console.error('AJAX Error:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Data Belum Lengkap Terisi',
        });
    }
}


// button simpan
// btn_simpan.addEventListener('click', function (e) {
//     try {
//         e.preventDefault();

//         if (tanggal.value === '') {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: `Tanggal tidak boleh kosong`,
//                 returnFocus: false
//             }).then(() => {
//                 tanggal.focus();
//             });
//             return;
//         }

//         if (tanggal.valueAsDate > currentDate) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: `Tanggal Lebih Besar Dari Tanggal Sekarang`,
//                 returnFocus: false
//             }).then(() => {
//                 tanggal.focus();
//             });
//             return;
//         }

//         if (!allInputsFilled()) {
//             return;
//         }

//         fixRefNo = No.value + "/KRR-QC/" + refNo.value + "/" + year.value;

//         if (jenis.length === 0) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: `Pilih Jenis FIBC Terlebih Dahulu !`,
//                 returnFocus: false
//             }).then(() => {
//                 document.getElementById("sample").focus();
//             });
//             return;
//         }

//         // konfirmasi checkbox sewing, stitch, fit to draw
//         let jenisText = ['Sewing Method', 'Stitch Approx', 'Fit to Drawing Spec.'];
//         let tidakTercentang = [];

//         centangCheck.forEach(function (length, index) {
//             if (length === 0) {
//                 tidakTercentang.push(index);
//             }
//         });

//         if (tidakTercentang.length > 0) {
//             let currentIndex = 0;

//             async function showSweetAlert() {
//                 let index = tidakTercentang[currentIndex];
//                 let questionText = `Apakah Data ${jenisText[index]} Mau Anda Lengkapi?`;

//                 Swal.fire({
//                     icon: 'question',
//                     text: questionText,
//                     showCancelButton: true,
//                     confirmButtonText: 'Ya',
//                     cancelButtonText: 'Tidak'
//                 }).then((result) => {
//                     if (result.isConfirmed) {
//                         return;
//                     } else {
//                         currentIndex++;
//                         if (currentIndex < tidakTercentang.length) {
//                             showSweetAlert();
//                         } else {
//                             await submitForm() ;
//                             console.log("kembali keluar if");
//                             return;
//                         }
//                     }
//                 });
//             }
//             showSweetAlert();
//         } else {
//             submitForm() ;
//         }

//     } catch (error) {
//         console.error('Exception:', error);
//     }
// });


// fungsi simpan masukkan ke database
// function submitForm() {
//     // console.log("ini submit");
//     logAllElements();
//     $.ajax({
//         type: 'POST',
//         url: 'FrmInputFIBC',
//         data: {
//             _token: csrfToken,

//             tanggal: tanggal,
//             fixRefNo: fixRefNo,
//             customer: customer.value,
//             bagCode: bagCode.value,
//             bagType: bagType.value,
//             poNo: poNo.value,
//             prodDate: prodDate.value,
//             testingDate: testingDate.value,
//             size: size.value,
//             reinforced: reinforced.value,
//             colour: colour.value,
//             panjang1: inputs1[0].value,
//             lebar1: inputs1[1].value,
//             waft1: inputs1[2].value,
//             denierWaft1: inputs1[3].value,
//             weft1: inputs1[4].value,
//             denierWeft1: inputs1[5].value,
//             weight1: weight1.value,
//             swl: swl.value,
//             sf: sf.value,
//             jenis: jenis,
//             liftBeltType: liftBeltType.value,
//             sewingThreadType: sewingThreadType.value,
//             sewing: sewing,
//             stitch: stitch,
//             draw: draw,
//             currentDate: currentDate,
//             panjang2: inputs2[0].value,
//             lebar2: inputs2[1].value,
//             waft2: inputs2[2].value,
//             denierWaft2: inputs2[3].value,
//             weft2: inputs2[4].value,
//             denierWeft2: inputs2[5].value,
//             weight2: weight2.value,
//             topS1: topS1.value,
//             topS2: topS2.value,
//             topS3: topS3.value,
//             topS4: topS4.value,
//             topS5: topS5.value,
//             topE1: topE1.value,
//             topE2: topE2.value,
//             topE3: topE3.value,
//             topE4: topE4.value,
//             topE5: topE5.value,
//             bottomS1: bottomS1.value,
//             bottomS2: bottomS2.value,
//             bottomS3: bottomS3.value,
//             bottomS4: bottomS4.value,
//             bottomS5: bottomS5.value,
//             bottomE1: bottomE1.value,
//             bottomE2: bottomE2.value,
//             bottomE3: bottomE3.value,
//             bottomE4: bottomE4.value,
//             bottomE5: bottomE5.value
//         },
//         timeout: 30000,
//         success: function (response) {
//             if (response.success) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Success',
//                     text: 'Data Telah Tersimpan',
//                 });

//                 inputAll.forEach(input => { input.value = ''; });
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error('AJAX Error:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'Data Belum Lengkap Terisi',
//             });
//         }
//     });
// }

// function submitForm() {
//     // Ensure all required data is ready before proceeding
//     if (!csrfToken || !customer.value || !bagCode.value /* Add other necessary checks */) {
//         console.error("One or more values are undefined or null.");
//         return; // Exit function if critical data is missing
//     }

//     $.ajax({
//         type: 'POST',
//         url: 'FrmInputFIBC',
//         data: {
//             _token: csrfToken,
//             tanggal: tanggal.value,
//             fixRefNo: fixRefNo,
//             customer: customer.value,
//             bagCode: bagCode.value,
//             // Add other data fields here
//         },
//         timeout: 30000,
//         success: function (response) {
//             if (response.success) {
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Success',
//                     text: 'Data Telah Tersimpan',
//                 });

//                 inputAll.forEach(input => { input.value = ''; });
//             }
//         },
//         error: function (xhr, status, error) {
//             console.error('AJAX Error:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'Data Belum Lengkap Terisi',
//             });
//         }
//     });
// }



// button koreksi
btn_koreksi.addEventListener("click", function (e) {

});

// button hapus
btn_hapus.addEventListener("click", function (e) {

});


