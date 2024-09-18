var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var tanggal = document.getElementById('tanggal');
var today = new Date();
var year = today.getFullYear();
var month = (today.getMonth() + 1).toString().padStart(2, '0');
var day = today.getDate().toString().padStart(2, '0');
var todayString = year + '-' + month + '-' + day;
var user = document.getElementById('user');

var divisiNama = document.getElementById('divisiNama');
var objekNama = document.getElementById('objekNama');
var kelompokNama = document.getElementById('kelompokNama');
var kelutNama = document.getElementById('kelutNama');
var subkelNama = document.getElementById('subkelNama');
var divisiNama2 = document.getElementById('divisiNama2');
var objekNama2 = document.getElementById('objekNama2');
var kelompokNama2 = document.getElementById('kelompokNama2');
var kelutNama2 = document.getElementById('kelutNama2');
var subkelNama2 = document.getElementById('subkelNama2');
var primer = document.getElementById('primer');
var sekunder = document.getElementById('sekunder');
var tritier = document.getElementById('tritier');
var no_primer = document.getElementById('no_primer');
var no_sekunder = document.getElementById('no_sekunder');
var no_tritier = document.getElementById('no_tritier');
var divisiId = document.getElementById('divisiId');
var objekId = document.getElementById('objekId');
var kodeTransaksi = document.getElementById('kodeTransaksi');
var namaBarang = document.getElementById('namaBarang');

// button
var btn_divisi = document.getElementById('btn_divisi');
var btn_objek = document.getElementById('btn_objek');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_refresh = document.getElementById('btn_refresh');

tanggal.value = todayString;

// menampilkan semua data
function showTable() {
    $.ajax({
        type: 'GET',
        url: 'PermohonanPenerimaBenang/getData',
        data: {
            _token: csrfToken,
            objekId: objekId.value,
            divisiNama: divisiNama.value
        },
        success: function (response) {
            if (response.warning) {
                Swal.fire({
                    icon: 'warning',
                    html: response.warning,
                    returnFocus: false
                });
            } else {
                updateDataTable(response);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

// fungsi unk update isi tabel
function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.IdTransaksi.trim()),
            escapeHtml(item.NamaType.trim()),
            escapeHtml(item.UraianDetailTransaksi.trim()),
            escapeHtml(item.NamaKelompokUtama.trim()),
            escapeHtml(item.NamaKelompok.trim()),
            escapeHtml(item.NamaSubKelompok.trim()),
            escapeHtml(item.IdPemberi.trim()),
            escapeHtml(formatNumber(item.JumlahPengeluaranPrimer.trim())),
            escapeHtml(formatNumber(item.JumlahPengeluaranSekunder.trim())),
            escapeHtml(formatNumber(item.JumlahPengeluaranTritier.trim())),
            escapeHtml(item.SaatAwalTransaksi.trim()),
            escapeHtml(item.KodeBarang.trim()),
            escapeHtml(item.TujuanIdSubkelompok.trim())
        ]);
    });
    table.draw();
}

var Primer, Sekunder, Tritier, Yidtransaksi, YKdBrg, SaldoPrimer, SaldoTritier, SaldoSekunder;
$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    var data = table.row(this).data();
    var checkbox = $(this).find('input.row-checkbox');

    kodeTransaksi.value = data[0];
    namaBarang.value = decodeHtmlEntities(data[1]);

    kelutNama.value = decodeHtmlEntities(data[3]);
    kelompokNama.value = decodeHtmlEntities(data[4]);
    subkelNama.value = decodeHtmlEntities(data[5]);
    primer.value = formatNumber(data[7]);
    sekunder.value = formatNumber(data[8]);
    tritier.value = formatNumber(data[9]);

    Yidtransaksi = data[0];
    YKdBrg = decodeHtmlEntities(data[11]);

    $.ajax({
        type: 'GET',
        url: 'PermohonanPenerima/getSelect',
        data: {
            _token: csrfToken,
            kodeTransaksi: kodeTransaksi.value
        },
        success: function (result) {
            if (result) {
                divisiNama2.value = result[0].NamaDivisi.trim();
                objekNama2.value = result[0].NamaObjek.trim();
                kelutNama2.value = result[0].NamaKelompokUtama.trim();
                kelompokNama2.value = result[0].NamaKelompok.trim();
                subkelNama2.value = result[0].NamaSubKelompok.trim();

                no_primer.value = result[0].Satuan_Primer?.trim() || 'Null';
                no_sekunder.value = result[0].Satuan_Sekunder?.trim() || 'Null';
                no_tritier.value = result[0].Satuan_Tritier?.trim() || 'Null';

                SaldoPrimer = result[0].SaldoPrimer;
                SaldoSekunder = result[0].SaldoSekunder;
                SaldoTritier = result[0].SaldoTritier;

                Primer = parseFloat(SaldoPrimer - primer.value);
                Sekunder = parseFloat(SaldoSekunder - sekunder.value);
                Tritier = parseFloat(SaldoTritier - tritier.value);

                console.log(Primer, Sekunder, Tritier);


                if (checkbox.is(':checked')) {
                    const index = completeDataArray.findIndex(item => item.tableData[1] === data[1]);
                    if (index === -1) {
                        completeDataArray.push({
                            tableData: data,
                            ajaxResult: result
                        });
                    }
                    console.log('data lengkap: ', completeDataArray);
                }
            }

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

// fungsi swal select pake arrow
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

// fungsi unk menampilkan '&'
function decodeHtmlEntities(str) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

// format angka
function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}

// fungsi dapetin user id unk pemohon
function getUserId() {
    $.ajax({
        type: 'GET',
        url: 'MhnPenerima/getUserId',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            user.value = result.user.trim();
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

$(document).ready(function () {
    getUserId();
});

// Function to check 'Cek_Sesuai_Pemberi'
async function Cek_Sesuai_Pemberi(sIdtrans) {
    try {
        const response = await $.ajax({
            type: 'GET',
            url: 'PermohonanPenerima/cekSesuaiPemberi',
            data: {
                _token: csrfToken,
                idtransaksi: sIdtrans,
            }
        });
        console.log(response);

        Yidtype = decodeHtmlEntities(response[0].IdType);
        if (response[0].jumlah >= 1) {
            await Swal.fire({
                icon: 'info',
                text: 'Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type '
                    + Yidtype + ' Pada divisi pemberi',
            });
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

var Yidtype, YIdTypePenerima;
// Function to check 'Cek_Sesuai_Penerima'
async function Cek_Sesuai_Penerima(sIdtrans, sKodeBarang) {
    try {
        const response = await $.ajax({
            type: 'GET',
            url: 'PermohonanPenerima/cekSesuaiPenerima',
            data: {
                _token: csrfToken,
                idtransaksi: sIdtrans,
                KodeBarang: sKodeBarang,
            }
        });
        YIdTypePenerima = decodeHtmlEntities(response[0].IdType);
        if (response[0].jumlah >= 1) {
            await Swal.fire({
                icon: 'info',
                text: 'Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type '
                    + YIdTypePenerima + ' Pada divisi pemberi',
            });
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

btn_ok.addEventListener('click', function () {
    showTable();
    btn_ok.disabled = true;
});

btn_refresh.addEventListener('click', function () {
    showTable();
});

btn_proses.addEventListener('click', async function () {
    if (parseFloat(Primer) < 0 || parseFloat(Sekunder) < 0 || parseFloat(Tritier) < 0) {
        Swal.fire({
            icon: 'error',
            html: 'Saldo Tidak Cukup, Cek Stok Anda !',
            returnFocus: false
        });
        return;
    }

    const isPemberiValid = await Cek_Sesuai_Pemberi(Yidtransaksi);
    const isPenerimaValid = await Cek_Sesuai_Penerima(Yidtransaksi, YKdBrg);

    if (isPemberiValid) {
        if (isPenerimaValid) {
            $.ajax({
                type: 'PUT',
                url: 'PermohonanPenerimaBenang/proses',
                data: {
                    _token: csrfToken,
                    Yidtransaksi: Yidtransaksi,
                    primer: primer.value,
                    sekunder: sekunder.value,
                    tritier: tritier.value,
                    YidType: Yidtype,
                    YidTypePenerima: YIdTypePenerima
                }
            })
                .then(result => {
                    sError = result.Nmerror.trim();

                    if (sError === 'BENAR') {
                        simpan = true;
                        ada = true;
                        if (simpan) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Data Sudah Disimpan!!',
                                returnFocus: false,
                            }).then(() => {
                                clearInputs();
                                showTable();
                            });
                        } else if (!ada) {
                            Swal.fire({
                                icon: 'warning',
                                title: 'Warning!',
                                text: 'Tidak Ada Data Yang DiTerima!!!!....., Untuk Menerima Barang pilih data pada tabel tersedia ',
                                returnFocus: false
                            }).then(() => {
                                return;
                            });
                        }
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            html: `Untuk Idtransaksi = ${Yidtransaksi} Tidak bisa diacc.<br>${sError}`,
                            returnFocus: false
                        }).then(() => {
                            return;
                        });
                    }
                });
        }
    }
});

function clearInputs(){
    kelutNama.value = '';
    kelompokNama.value = '';
    subkelNama.value = '';
    kodeTransaksi.value = '';
    divisiNama2.value = '';
    objekNama2.value = '';
    kelutNama2.value = '';
    kelompokNama2.value = '';
    subkelNama2.value = '';
    namaBarang.value = '';
    primer.value = '';
    sekunder.value = '';
    tritier.value = '';
    no_primer.value = '';
    no_sekunder.value = '';
    no_tritier.value = '';
}

// button list divisi pemberi
btn_divisi.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Divisi',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Divisi</th>
                            <th scope="col">Nama Divisi</th>
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
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPenerima/getDivisi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdDivisi" },
                            { data: "NamaDivisi" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                divisiId.value = result.value.IdDivisi.trim();
                divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());

                btn_objek.disabled = false;
                btn_objek.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_objek.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Objek',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Objek</th>
                            <th scope="col">Nama Objek</th>
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
            width: '40%',
            returnFocus: false,
            showCloseButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Select',
            didOpen: () => {
                $(document).ready(function () {
                    const table = $("#table_list").DataTable({
                        responsive: true,
                        processing: true,
                        serverSide: true,
                        paging: false,
                        scrollY: '400px',
                        scrollCollapse: true,
                        order: [1, "asc"],
                        ajax: {
                            url: "MhnPenerima/getObjek",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                divisiId: divisiId.value
                            }
                        },
                        columns: [
                            { data: "IdObjek" },
                            { data: "NamaObjek" }
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                width: '100px',
                            }
                        ]
                    });

                    $("#table_list tbody").on("click", "tr", function () {
                        table.$("tr.selected").removeClass("selected");
                        $(this).addClass("selected");
                    });

                    currentIndex = null;
                    Swal.getPopup().addEventListener('keydown', (e) => handleTableKeydown(e, 'table_list'));
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                objekId.value = result.value.IdObjek.trim();
                objekNama.value = decodeHtmlEntities(result.value.NamaObjek.trim());

                if (objekNama.value !== '') {
                    btn_ok.disabled = false;
                    btn_ok.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
});

$(document).ready(function () {
    getUserId();
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            { title: 'ID Trans' },
            { title: 'Barang' },
            { title: 'Alasan Mutasi' },
            { title: 'Kelut Penerima' },
            { title: 'Kel Penerima' },
            { title: 'SubKel' },
            { title: 'Pemohon' },
            { title: 'Primer' },
            { title: 'Sekunder' },
            { title: 'Tritier' },
            { title: 'Tgl Mohon' },
            { title: 'KdBrg' },
        ],
        colResize: {
            isEnabled: true,
            hoverClass: 'dt-colresizable-hover',
            hasBoundCheck: true,
            minBoundClass: 'dt-colresizable-bound-min',
            maxBoundClass: 'dt-colresizable-bound-max',
            saveState: true,
            // isResizable: function (column) {
            //     return column.idx !== 2;
            // },
            onResize: function (column) {
                //console.log('...resizing...');
            },
            onResizeEnd: function (column, columns) {
                // console.log('I have been resized!');
            },
            stateSaveCallback: function (settings, data) {
                let stateStorageName = window.location.pathname + "/colResizeStateData";
                localStorage.setItem(stateStorageName, JSON.stringify(data));
            },
            stateLoadCallback: function (settings) {
                let stateStorageName = window.location.pathname + "/colResizeStateData",
                    data = localStorage.getItem(stateStorageName);
                return data != null ? JSON.parse(data) : null;
            }
        },
        scrollY: '400px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0], width: '12%', className: 'fixed-width' },
        { targets: [1], width: '27%', className: 'fixed-width' },
        { targets: [2], width: '25%', className: 'fixed-width' },
        { targets: [3], width: '12%', className: 'fixed-width' },
        { targets: [4], width: '10%', className: 'fixed-width' },
        { targets: [5], width: '10%', className: 'fixed-width' },
        { targets: [6], width: '10%', className: 'fixed-width' },
        { targets: [7], width: '12%', className: 'fixed-width' },
        { targets: [8], width: '12%', className: 'fixed-width' },
        { targets: [9], width: '12%', className: 'fixed-width' },
        { targets: [10], width: '12%', className: 'fixed-width' },
        { targets: [11], width: '12%', className: 'fixed-width'}
    ]
    });
});
