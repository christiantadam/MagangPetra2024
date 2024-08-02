document.addEventListener("DOMContentLoaded", function () {
    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    var refNo = document.getElementById('refNo');
    var customer = document.getElementById('customer');
    var btn_info = document.getElementById('btn_info');
    var btn_detail = document.getElementById('btn_detail');
    var btn_tahun = document.getElementById('btn_tahun');
    var tahun = document.getElementById('tahun');

    var beforeTest = document.getElementById('beforeTest');
    var afterCyclic = document.getElementById('afterCyclic');
    var afterTop = document.getElementById('afterTop');
    var testResult = document.getElementById('testResult');

    var refNumPreview = document.getElementById('refNumPreview');
    var revNoPreview = document.getElementById('revNoPreview');
    var datePreview = document.getElementById('datePreview');
    var pagePreview = document.getElementById('pagePreview');

    var customerName = document.getElementById('customerName');
    var bagCode = document.getElementById('bagCode');
    var bagType = document.getElementById('bagType');
    var poNo = document.getElementById('poNo');
    var prodDate = document.getElementById('prodDate');
    var testingDate = document.getElementById('testingDate');

    var size = document.getElementById('size');
    var reinforced = document.getElementById('reinforced');
    var colour = document.getElementById('colour');
    var weight1 = document.getElementById('weight1');
    var weight2 = document.getElementById('weight2');
    var swlSf = document.getElementById('swlSf');

    var sampleCheckbox = document.getElementById('sample');
    var productionCheckbox = document.getElementById('production');
    var trialCheckbox = document.getElementById('trial');
    var preProductionCheckbox = document.getElementById('preProduction');
    var specModificationCheckbox = document.getElementById('specModification');
    var sampleFromCustomerCheckbox = document.getElementById('sampleFromCustomer');

    var cyclicTestCheckbox = document.getElementById('cyclicTestCyclic');
    var singleLoopsCheckbox = document.getElementById('singleLoopsCyclic');
    var fourLoopsCheckbox = document.getElementById('fourLoopsCyclic');
    var twoLoopsCheckbox = document.getElementById('twoLoopsCyclic');
    var stevedoreCheckbox = document.getElementById('stevedoreCyclic');
    var auxiliaryCheckbox = document.getElementById('auxiliaryCyclic');

    var noVisibleDamageCheckbox = document.getElementById('noVisibleDamageCyclic');
    var visibleDamagesCheckbox = document.getElementById('visibleDamagesCyclic');
    var visibleDamageInput = document.getElementById('visibleDamageCyclicInput');

    var topLiftTestCheckbox = document.getElementById('topLiftTest');
    var singleLoopsTopCheckbox = document.getElementById('singleLoopsTop');
    var fourLoopsTopCheckbox = document.getElementById('fourLoopsTop');
    var twoLoopsTopCheckbox = document.getElementById('twoLoopsTop');
    var stevedoreTopCheckbox = document.getElementById('stevedoreTop');
    var auxiliaryTopCheckbox = document.getElementById('auxiliaryTop');

    var angkaBerat = document.getElementById('angkaBerat');

    var bodyFabricCheckbox = document.getElementById('bodyFabric');
    var petalCheckbox = document.getElementById('petal');
    var sideBodyThreadCheckbox = document.getElementById('sideBodyThread');
    var bottomFabricCheckbox = document.getElementById('bottomFabric');
    var liftingBeltCheckbox = document.getElementById('liftingBelt');
    var bottomBodyThreadCheckbox = document.getElementById('bottomBodyThread');
    var starcutBottomSproutCheckbox = document.getElementById('starcutBottomSprout');
    var liftingBeltThreadCheckbox = document.getElementById('liftingBeltThread');
    var othersCheckbox = document.getElementById('others');
    var topLiftOthersInput = document.getElementById('topLiftOthers');

    var dropTestCheckbox = document.getElementById('dropTest');
    var noVisibleDamageDropCheckbox = document.getElementById('noVisibleDamageDrop');
    var visibleDamageDropCheckbox = document.getElementById('visibleDamageDrop');
    var visibleDamageDropInput = document.getElementById('visibleDamageDropInput');

    var liftingBeltType = document.getElementById('liftingBeltType');
    var sewingThreadType = document.getElementById('sewingThreadType');

    var topKg1 = document.getElementById('topKg1');
    var topPersen1 = document.getElementById('topPersen1');
    var bottomKg1 = document.getElementById('bottomKg1');
    var bottomPersen1 = document.getElementById('bottomPersen1');

    var topKg2 = document.getElementById('topKg2');
    var topPersen2 = document.getElementById('topPersen2');
    var bottomKg2 = document.getElementById('bottomKg2');
    var bottomPersen2 = document.getElementById('bottomPersen2');

    var topKg3 = document.getElementById('topKg3');
    var topPersen3 = document.getElementById('topPersen3');
    var bottomKg3 = document.getElementById('bottomKg3');
    var bottomPersen3 = document.getElementById('bottomPersen3');

    var topKg4 = document.getElementById('topKg4');
    var topPersen4 = document.getElementById('topPersen4');
    var bottomKg4 = document.getElementById('bottomKg4');
    var bottomPersen4 = document.getElementById('bottomPersen4');

    var topKg5 = document.getElementById('topKg5');
    var topPersen5 = document.getElementById('topPersen5');
    var bottomKg5 = document.getElementById('bottomKg5');
    var bottomPersen5 = document.getElementById('bottomPersen5');

    var mitsumakiCheckbox = document.getElementById('mitsumaki');
    var ogamiCheckbox = document.getElementById('ogami');
    var halfMitsumakiCheckbox = document.getElementById('halfMitsumaki');
    var otherSewingMethodCheckbox = document.getElementById('otherSewingMethod');

    var bottomApproxCheckbox = document.getElementById('bottomApprox');
    var sideBodyApproxCheckbox = document.getElementById('sideBodyApprox');
    var liftingBeltApproxCheckbox = document.getElementById('liftingBeltApprox');

    var fitDrawYesCheckbox = document.getElementById('fitDrawYes');
    var fitDrawNoCheckbox = document.getElementById('fitDrawNo');

    var heightApprox = document.getElementById('heightApprox');

    var diaPressureCheckbox = document.getElementById('diaPressure');
    var testDia = document.getElementById('testDia');

    var squarePressureCheckbox = document.getElementById('squarePressure');
    var testSquare = document.getElementById('testSquare');

    var cycleLoadApprox = document.getElementById('cycleLoadApprox');

    var loadSpeed = document.getElementById('loadSpeed');

    var dropTestDetail = document.getElementById('dropTestDetail');

    var idSpv = document.getElementById('idSpv');
    var idMng = document.getElementById('idMng');

    var printPdf = document.getElementById('printPdf');

    btn_tahun.focus();

    printPdf.addEventListener('click', (e) => {
        e.preventDefault();
        window.print();
    });

    function formatNumber(value) {
        return parseFloat(value).toFixed(2);
    }

    function handleTableKeydown(e, tableId) {
        const table = $(`#${tableId}`).DataTable();
        const rows = $(`#${tableId} tbody tr`);
        const rowCount = rows.length;

        if (e.key === "Enter") {
            e.preventDefault();
            const selectedRow = table.row(".selected").data();
            if (selectedRow) {
                Swal.getConfirmButton().click();
            } else {
                const firstRow = $(`#${tableId} tbody tr:first-child`);
                if (firstRow.length) {
                    firstRow.click();
                    Swal.getConfirmButton().click();
                }
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (currentIndex === null) {
                currentIndex = 0;
            } else {
                currentIndex = (currentIndex + 1) % rowCount;
            }
            rows.removeClass("selected");
            $(rows[currentIndex]).addClass("selected");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (currentIndex === null) {
                currentIndex = rowCount - 1;
            } else {
                currentIndex = (currentIndex - 1 + rowCount) % rowCount;
            }
            rows.removeClass("selected");
            $(rows[currentIndex]).addClass("selected");
        } else if (e.key === "ArrowRight") {
            e.preventDefault();
            currentIndex = null;
            const pageInfo = table.page.info();
            if (pageInfo.page < pageInfo.pages - 1) {
                table.page('next').draw('page');
            }
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            currentIndex = null;
            const pageInfo = table.page.info();
            if (pageInfo.page > 0) {
                table.page('previous').draw('page');
            }
        }
    }

    // tahun button
    btn_tahun.addEventListener("click", function (e) {
        try {
            let result = Swal.fire({
                title: "Pilih Tahun",
                html: `<table id="table_tahun" class="display" style="width:100%">
                            <thead>
                                <tr>
                                    <th>Tahun</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>`,
                showCancelButton: true,
                confirmButtonText: 'Pilih',
                cancelButtonText: 'Close',
                returnFocus: false,
                preConfirm: () => {
                    const selectedData = $("#table_tahun")
                        .DataTable()
                        .row(".selected")
                        .data();
                    if (!selectedData) {
                        Swal.showValidationMessage("Please select a row");
                        return false;
                    }
                    return selectedData;
                },
                didClose:() =>{
                    btn_info.focus();
                },
                didOpen: () => {
                    const table = $("#table_tahun").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [[0, "asc"]], // Corrected to reference the first column (index 0)
                        ajax: {
                            url: "FrmPrintFIBC/getTahun",
                            dataType: "json",
                            type: "GET",
                        },
                        columns: [
                            {
                                data: "Tahun",
                            },
                        ],
                    });

                    $("#table_tahun tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_tahun'));
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const selectedRow = result.value;
                    tahun.value = selectedRow.Tahun.trim(); // Corrected to reference the "Tahun" field
                }
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    });

    // saat pilih no ref
    btn_info.addEventListener("click", function (e) {
        try {
            Swal.fire({
                title: 'ACC QC Spv',
                html: `
                    <table id="table_list" class="table">
                        <thead>
                            <tr>
                                <th scope="col">Reference No</th>
                                <th scope="col">Customer</th>
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
                    // Initialize DataTable inside didOpen to ensure DOM is ready
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        order: [[0, "asc"]],
                        ajax: {
                            url: "FrmPrintFIBC/getRef",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                tahun: tahun.value
                            }
                        },
                        columns: [
                            { data: "Reference_No" },
                            { data: "Customer" }
                        ]
                    });

                    // Handle row selection
                    $("#table_list tbody").on("click", "tr", function () {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        } else {
                            table.$('tr.selected').removeClass('selected');
                            $(this).addClass('selected');
                        }
                    });
                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                }
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    refNo.value = result.value.Reference_No;
                    customer.value = result.value.Customer;

                    printPdf.disabled = false;
                    btn_detail.disabled = false;

                    $('.preview').show();
                    $('.previewBiasa').show();
                    $('.previewDetail').hide();

                    $.ajax({
                        url: "FrmPrintFIBC/getDetail",
                        type: "GET",
                        data: {
                            _token: csrfToken,
                            no_ref: refNo.value
                        },
                        timeout: 30000,
                        success: function (response) {

                            const { result, count, tes } = response;

                            $('.preview').show();
                            $('.previewBiasa').show();
                            $('.previewDetail').hide();

                            if (count === '3') {
                                $('.empatGambar').hide();
                                $('.tigaGambar').show();
                            }
                            if (count === '4') {
                                $('.empatGambar').show();
                                $('.tigaGambar').hide();
                            }

                            if (tes === 'PASS') {
                                $('.passed').show();
                                $('.failed').hide();
                            }
                            if (tes === 'FAIL') {
                                $('.passed').hide();
                                $('.failed').show();
                            }

                            // general data atas kanan
                            refNumPreview.textContent = result[0].Reference_No;
                            // revNoPreview.textContent = result[0].Rev_No;
                            // pagePreview.textContent = result[0].Page;

                            var date = new Date(result[0].Tanggal);
                            datePreview.textContent = date.toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            });


                            // box kiri info
                            customerName.textContent = result[0].Customer;
                            bagCode.textContent = result[0].Bag_Code;
                            bagType.textContent = result[0].Bag_Type;
                            poNo.textContent = result[0].PO_No;

                            var prodDateObj = new Date(result[0].Tanggal_Prod);
                            var testingDateObj = new Date(result[0].Tanggal_Testing);

                            prodDate.textContent = prodDateObj.toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            });
                            testingDate.textContent = testingDateObj.toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            });


                            // box kanan info
                            size.textContent = (result[0].Size) + ' CM';
                            reinforced.textContent = (result[0].Reinforced);
                            colour.textContent = result[0].Colour;
                            weight1.textContent = formatNumber(result[0].Weight) + ' gsm';
                            weight2.textContent = formatNumber(result[0].Weight2) + ' gsm';
                            if (result[0] && result[0].SWL !== undefined && result[0].SF !== undefined) {
                                let swl = parseFloat(result[0].SWL).toFixed(2);
                                swl = swl.endsWith('.00') ? swl.slice(0, -3) : swl;

                                let sf = parseFloat(result[0].SF).toFixed(2);
                                sf = sf.endsWith('.00') ? sf.slice(0, -3) : sf;

                                swlSf.textContent = `${swl} kg / ${sf} : 1`;
                            }


                            // jenis fibc
                            const jenisFIBCInfo = result[0].Jenis_FIBC;
                            if (jenisFIBCInfo) {
                                if (jenisFIBCInfo === ('Sample')) {
                                    sampleCheckbox.checked = true;
                                }
                                if (jenisFIBCInfo === ('Production')) {
                                    productionCheckbox.checked = true;
                                }
                                if (jenisFIBCInfo === ('Trial')) {
                                    trialCheckbox.checked = true;
                                }
                                if (jenisFIBCInfo === ('Pre-production')) {
                                    preProductionCheckbox.checked = true;
                                }
                                if (jenisFIBCInfo === ('Spec. Modification')) {
                                    specModificationCheckbox.checked = true;
                                }
                                if (jenisFIBCInfo === ('Sample dari Customer')) {
                                    sampleFromCustomerCheckbox.checked = true;
                                }
                            }


                            // cyclic checkbox
                            const cyclicLiftInfo = result[0].Cyclic_Lift;
                            if (cyclicLiftInfo === ('Single Loops')) {
                                singleLoopsCheckbox.checked = true;
                                cyclicTestCheckbox.checked = true;
                            }
                            if (cyclicLiftInfo === ('Four Loops')) {
                                cyclicTestCheckbox.checked = true;
                                fourLoopsCheckbox.checked = true;
                            }
                            if (cyclicLiftInfo === ('Two Loops')) {
                                cyclicTestCheckbox.checked = true;
                                twoLoopsCheckbox.checked = true;
                            }
                            if (cyclicLiftInfo === ('Stevedore')) {
                                cyclicTestCheckbox.checked = true;
                                stevedoreCheckbox.checked = true;
                            }
                            if (cyclicLiftInfo === ('Auxiliary')) {
                                cyclicTestCheckbox.checked = true;
                                auxiliaryCheckbox.checked = true;
                            }


                            // result cyclic
                            const resultCylicInfo = result[0].Cyclic_Result;
                            if (resultCylicInfo === ('No visible damages occurred')) {
                                noVisibleDamageCheckbox.checked = true;
                            }
                            if (resultCylicInfo.startsWith('Visible damages found at')) {
                                visibleDamagesCheckbox.checked = true;
                                var location = resultCylicInfo.substring('Visible damages found at '.length).trim();
                                visibleDamageInput.value = location;
                            }


                            // top lift
                            const topLiftInfo = result[0].Top_Lift;
                            if (topLiftInfo === ('Single Loops')) {
                                topLiftTestCheckbox.checked = true;
                                singleLoopsTopCheckbox.checked = true;
                            }
                            if (topLiftInfo === ('Four Loops')) {
                                topLiftTestCheckbox.checked = true;
                                fourLoopsTopCheckbox.checked = true;
                            }
                            if (topLiftInfo === ('Two Loops')) {
                                topLiftTestCheckbox.checked = true;
                                twoLoopsTopCheckbox.checked = true;
                            }
                            if (topLiftInfo === ('Stevedore')) {
                                topLiftTestCheckbox.checked = true;
                                stevedoreTopCheckbox.checked = true;
                            }
                            if (topLiftInfo === ('Auxiliary')) {
                                topLiftTestCheckbox.checked = true;
                                auxiliaryTopCheckbox.checked = true;
                            }

                            // berat
                            if (result[0] && result[0].Top_Result !== undefined) {
                                let topResult = parseFloat(result[0].Top_Result).toLocaleString('en-US', {
                                    minimumFractionDigits: 0, // Optional: Set to 0 to avoid decimal places
                                    maximumFractionDigits: 2  // Optional: Set to 2 to limit to two decimal places
                                });
                                angkaBerat.innerHTML = `<strong>${topResult} kg</strong>`;
                            }

                            // breakage loc
                            const breakageInfo = result[0].Breakage_Location.trim();
                            if (breakageInfo === ('Body fabric')) {
                                bodyFabricCheckbox.checked = true;
                            }
                            if (breakageInfo === ('Petal')) {
                                petalCheckbox.checked = true;
                            }
                            if (breakageInfo === ('Side body\'s thread')) {
                                sideBodyThreadCheckbox.checked = true;
                            }
                            if (breakageInfo === ('Bottom fabric')) {
                                bottomFabricCheckbox.checked = true;
                            }
                            if (breakageInfo === ('Lifting belt')) {
                                liftingBeltCheckbox.checked = true;
                            }
                            if (breakageInfo === ('Bottom body\'s thread')) {
                                bottomBodyThreadCheckbox.checked = true;
                            }
                            if (breakageInfo === ('Starcut of bottom sprout')) {
                                starcutBottomSproutCheckbox.checked = true;
                            }
                            if (breakageInfo === ('Lifting belt\'s thread')) {
                                liftingBeltThreadCheckbox.checked = true;
                            }
                            if (breakageInfo.startsWith('Others :')) {
                                othersCheckbox.checked = true;
                                const othersValue = breakageInfo.substring('Others : '.length).trim();
                                topLiftOthersInput.value = othersValue;
                            }

                            // drop test 80 cm
                            const dropTestInfo = result[0].Drop_Result;
                            if (dropTestInfo === ('No visible damages occurred')) {
                                noVisibleDamageDropCheckbox.checked = true;
                                dropTestCheckbox.checked = true;
                            }
                            if (dropTestInfo.startsWith('Visible damages found at')) {
                                visibleDamageDropCheckbox.checked = true;
                                dropTestCheckbox.checked = true;
                                var location = dropTestInfo.substring('Visible damages found at '.length).trim();
                                visibleDamageDropInput.value = location;
                            }

                            // images
                            var imageData1 = result[0].Pict_1;
                            var imageUrl1 = 'data:image/jpeg;base64,' + imageData1;
                            beforeTest.src = imageUrl1;

                            var imageData2 = result[0].Pict_2;
                            var imageUrl2 = 'data:image/jpeg;base64,' + imageData2;
                            afterCyclic.src = imageUrl2

                            var imageData3 = result[0].Pict_3;
                            var imageUrl3 = 'data:image/jpeg;base64,' + imageData3;
                            afterTop.src = imageUrl3;

                            var imageData4 = result[0].Pict_4;
                            if (imageData4) {
                                var imageUrl4 = 'data:image/jpeg;base64,' + imageData4;
                                testResult.src = imageUrl4;
                            }


                            // chart
                            const dataValues = [];
                            for (let i = 1; i <= 30; i++) {
                                dataValues.push(result[0][`Data_${i}`]);
                            }
                            dataValues.push(result[0].Top_Result); //untuk 31

                            const ctx = document.getElementById('dataChart').getContext('2d');
                            const dataChart = new Chart(ctx, {
                                type: 'line',
                                data: {
                                    labels: Array.from({ length: 30 }, (_, i) => (i + 1)).concat([31]),
                                    datasets: [{
                                        data: dataValues,
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 2,
                                        fill: false,
                                        lineTension: 0.1
                                    }]
                                },
                                options: {
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'FIBC - Cyclic Top Lift Test',
                                            font: {
                                                size: 12
                                            },
                                        },
                                        legend: {
                                            display: false
                                        }
                                    },
                                    scales: {

                                        y: {
                                            title: {
                                                display: true,
                                                text: 'kg'
                                            },
                                            beginAtZero: true,
                                            min: 0,
                                            max: 12000,
                                            ticks: {
                                                stepSize: 2000
                                            }
                                        }
                                    }
                                }
                            });

                            idSpv.innerHTML = `<h5><em>QC - ${result[0].UserACC}</em></h5>`;
                            idMng.innerHTML = `<h5><em>QC - ${result[0].ManagerACC}</em></h5>`;


                            btn_detail.addEventListener("click", function (e) {
                                $('.previewBiasa').hide();
                                $('.previewDetail').show();

                                // A. Lifting Belt
                                liftingBeltType.textContent = ': ' + result[0].LiftingBelt_Type;

                                // B. Sewing Thread
                                sewingThreadType.textContent = ': ' + result[0].SewingThread_Type;
                                topKg1.textContent = formatNumber(result[0].Top_KG_1) + ' kg';
                                topPersen1.textContent = formatNumber(result[0].Top_Persen_1) + ' %';
                                bottomKg1.textContent = formatNumber(result[0].Bottom_KG_1) + ' kg';
                                bottomPersen1.textContent = formatNumber(result[0].Bottom_Persen_1) + ' %';

                                topKg2.textContent = formatNumber(result[0].Top_KG_2) + ' kg';
                                topPersen2.textContent = formatNumber(result[0].Top_Persen_2) + ' %';
                                bottomKg2.textContent = formatNumber(result[0].Bottom_KG_2) + ' kg';
                                bottomPersen2.textContent = formatNumber(result[0].Bottom_Persen_2) + ' %';

                                topKg3.textContent = formatNumber(result[0].Top_KG_3) + ' kg';
                                topPersen3.textContent = formatNumber(result[0].Top_Persen_3) + ' %';
                                bottomKg3.textContent = formatNumber(result[0].Bottom_KG_3) + ' kg';
                                bottomPersen3.textContent = formatNumber(result[0].Bottom_Persen_3) + ' %';

                                topKg4.textContent = formatNumber(result[0].Top_KG_4) + ' kg';
                                topPersen4.textContent = formatNumber(result[0].Top_Persen_4) + ' %';
                                bottomKg4.textContent = formatNumber(result[0].Bottom_KG_4) + ' kg';
                                bottomPersen4.textContent = formatNumber(result[0].Bottom_Persen_4) + ' %';

                                topKg5.textContent = formatNumber(result[0].Top_KG_5) + ' kg';
                                topPersen5.textContent = formatNumber(result[0].Top_Persen_5) + ' %';
                                bottomKg5.textContent = formatNumber(result[0].Bottom_KG_5) + ' kg';
                                bottomPersen5.textContent = formatNumber(result[0].Bottom_Persen_5) + ' %';


                                // C. Sewing Method
                                const sewingMethodInfo = result[0].Sewing_Method;
                                if (sewingMethodInfo === 'Mitsumaki') {
                                    mitsumakiCheckbox.checked = true;
                                }
                                if (sewingMethodInfo === 'Ogami') {
                                    ogamiCheckbox.checked = true;
                                }
                                if (sewingMethodInfo === 'Half Mitsumaki') {
                                    halfMitsumakiCheckbox.checked = true;
                                }
                                if (sewingMethodInfo === 'Other') {
                                    otherSewingMethodCheckbox.checked = true;
                                }


                                // D. Stitch Approx.
                                const stitchApproxInfo = result[0].Stitch_Approx;
                                if (stitchApproxInfo === ('Bottom')) {
                                    bottomApproxCheckbox.checked = true;
                                }
                                if (stitchApproxInfo === ('Side Body')) {
                                    sideBodyApproxCheckbox.checked = true;
                                }
                                if (stitchApproxInfo === ('Lifting Belt')) {
                                    liftingBeltApproxCheckbox.checked = true;
                                }

                                // E. Fit to drawing Spec.?
                                const fitDrawInfo = result[0].Fit_to_Draw;
                                if (fitDrawInfo === 'Yes') {
                                    fitDrawYesCheckbox.checked = true;
                                } else if (fitDrawInfo === 'No') {
                                    fitDrawNoCheckbox.checked = true;
                                }

                                // A. Test Condition
                                if (result[0].Height_Approx > 0) {
                                    heightApprox.textContent = formatNumber(result[0].Height_Approx) + ' Cm';
                                } else {
                                    heightApprox.textContent = '.....Cm';
                                }

                                if (result[0].Dia > 0) {
                                    diaPressureCheckbox.checked = true;
                                    testDia.textContent = formatDecimal(result[0].Dia) + ' cm';
                                } else {
                                    diaPressureCheckbox.checked = false;
                                }

                                if (result[0].Square) {
                                    squarePressureCheckbox.checked = true;
                                    testSquare.textContent = formatDecimal(result[0].Square) + ' cm';
                                } else {
                                    squarePressureCheckbox.checked = false;
                                }

                                // B. Cyclic Test
                                if (result[0].Cyclic_Test > 0) {
                                    cycleLoadApprox.textContent = formatNumber(result[0].Cyclic_Test) + ' kg (2 x SWL)';
                                }

                                // C. Top Lift Test
                                if (result[0].Load_Speed > 0) {
                                    loadSpeed.textContent = formatNumber(result[0].Load_Speed) + ' cm / mnt (Bag dalam keadaan kosong)';
                                }

                                function generateTable() {
                                    const tableContainer = document.getElementById('tableContainer');

                                    // Check if the table already exists
                                    if (tableContainer.querySelector('table')) {
                                        console.log('Table has already been generated.');
                                        return; // Exit the function if table already exists
                                    }

                                    const data = result[0];
                                    const table = document.createElement('table');
                                    table.className = 'table table-bordered';

                                    const tbody = document.createElement('tbody');

                                    for (let i = 0; i < 5; i++) {
                                        const row = document.createElement('tr');
                                        for (let j = 1; j <= 6; j++) {
                                            const td = document.createElement('td');
                                            td.textContent = data[`Data_${i * 6 + j}`] || '';
                                            row.appendChild(td);
                                        }
                                        tbody.appendChild(row);
                                    }

                                    // Create last row with merged cells
                                    const lastRow = document.createElement('tr');
                                    const td1 = document.createElement('td');
                                    td1.colSpan = 2;
                                    td1.innerHTML = '<strong>Test to Failure</strong>';
                                    lastRow.appendChild(td1);

                                    const td2 = document.createElement('td');
                                    td2.colSpan = 4;
                                    td2.textContent = result[0].Top_Result;
                                    lastRow.appendChild(td2);

                                    tbody.appendChild(lastRow);

                                    table.appendChild(tbody);

                                    tableContainer.appendChild(table);
                                }

                                // Call the function to generate and display the table
                                generateTable();


                                if (result[0].Drop_Test) {
                                    dropTestDetail.textContent = result[0].Drop_Test;
                                }

                            });


                        }
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    });
});
