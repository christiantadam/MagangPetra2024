var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Button variables
var btn_proses = document.getElementById("btn_proses");
var btn_batal = document.getElementById("btn_batal");
var btn_divisi = document.getElementById("btn_divisi");
var btn_objek = document.getElementById("btn_objek");
var btn_kelompok = document.getElementById("btn_kelompok");
var btn_kelut = document.getElementById("btn_kelut");
var btn_subkel = document.getElementById("btn_subkel");

// Divisi section
var divisiNama = document.getElementById("divisiNama");
var penerima = document.getElementById("penerima");
var objekNama = document.getElementById("objekNama");
var kelompokNama = document.getElementById("kelompokNama");
var kelutNama = document.getElementById("kelutNama");
var subkelNama = document.getElementById("subkelNama");

// Hidden ID inputs
var divisiId = document.getElementById("divisiId");
var objekId = document.getElementById("objekId");
var kelompokId = document.getElementById("kelompokId");
var kelutId = document.getElementById("kelutId");
var subkelId = document.getElementById("subkelId");

// Kode Transaksi section
var kodeTransaksi = document.getElementById("kodeTransaksi");
var tanggal = document.getElementById("tanggal");
var pib = document.getElementById("pib");
var kodeBarang = document.getElementById("kodeBarang");
var kodeType = document.getElementById("kodeType");
var namaBarang = document.getElementById("namaBarang");

// Jumlah Barang section
var primer = document.getElementById("primer");
var satuanPrimer = document.getElementById("satuanPrimer");
var sekunder = document.getElementById("sekunder");
var satuanSekunder = document.getElementById("satuanSekunder");
var tritier = document.getElementById("tritier");
var satuanTritier = document.getElementById("satuanTritier");

function getUserId() {
    $.ajax({
        type: 'GET',
        url: 'TerimaPurchasing/getUserId',
        data: {
            _token: csrfToken
        },
        success: function (result) {
            penerima.value = result.user;
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

$(document).ready(function () {
    getUserId();
    $('#btn_kelompok').hide();
    $('#btn_kelut').hide();
    $('#btn_subkel').hide();
});

$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: true,
        columns: [
            { title: 'Tgl Datang' },
            { title: 'Kode Type' },
            { title: 'Nama Barang' },
            { title: 'Jml. Primer' },
            { title: 'Jml. Sekunder' },
            { title: 'Jml. Tritier' },
            { title: 'Kode Transaksi' },
            { title: 'NoPIB' },
        ]
    });
});

function decodeHtmlEntities(text) {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
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

function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear();

    data.forEach(function (item) {
        table.row.add([
            escapeHtml(item.SaatAwalTransaksi),
            escapeHtml(item.IdType),
            escapeHtml(item.NamaType),
            formatNumber(item.JumlahPemasukanPrimer),
            formatNumber(item.JumlahPemasukanSekunder),
            formatNumber(item.JumlahPemasukanTritier),
            escapeHtml(item.IdTransaksi),
            escapeHtml(item.PIB),
            escapeHtml(item.SatPrimer),
            escapeHtml(item.SatSekunder),
            escapeHtml(item.SatTritier),
            escapeHtml(item.KodeBarang),
        ]);
    });

    table.draw();
}

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}


$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    var data = table.row(this).data();

    let XIdType = data[1];

    let originalDate = new Date(data[0]);

    let month = originalDate.getMonth() + 1;
    let day = originalDate.getDate();
    let year = originalDate.getFullYear();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    let formattedDate = `${month}/${day}/${year}`;

    tanggal.value = formattedDate;

    kodeType.value = decodeHtmlEntities(data[1]);
    namaBarang.value = decodeHtmlEntities(data[2]);
    primer.value = formatNumber(data[3]);
    sekunder.value = formatNumber(data[4]);
    tritier.value = formatNumber(data[5]);
    kodeTransaksi.value = decodeHtmlEntities(data[6]);
    satuanPrimer.value = decodeHtmlEntities(data[8]);
    satuanSekunder.value = decodeHtmlEntities(data[9]);
    satuanTritier.value = decodeHtmlEntities(data[10]);
    kodeBarang.value = decodeHtmlEntities(data[11]);
    pib.value = data[7] ? decodeHtmlEntities(data[7]) : '';


    $.ajax({
        type: 'GET',
        url: 'TerimaPurchasing/getDetailId',
        data: {
            XIdType: XIdType,
            _token: csrfToken
        },
        success: function (result) {
            if (result) {
                kelutId.value = decodeHtmlEntities(result[0].IdKelompokUtama.trim());
                kelutNama.value = decodeHtmlEntities(result[0].NamaKelompokUtama.trim());
                kelompokId.value = decodeHtmlEntities(result[0].IdKelompok.trim());
                kelompokNama.value = decodeHtmlEntities(result[0].NamaKelompok.trim());
                subkelId.value = decodeHtmlEntities(result[0].IdSubkelompok_Type.trim());
                subkelNama.value = decodeHtmlEntities(result[0].NamaSubKelompok.trim());

                $.ajax({
                    type: 'GET',
                    url: 'TerimaPurchasing/getDetailNama',
                    data: {
                        IdObjek: objekId.value,
                        KodeBarang: kodeBarang.value,
                        _token: csrfToken
                    },
                    success: function (result) {
                        if (result[0].Ada > 1) {
                            btn_divisi.disabled = true;
                            btn_objek.disabled = true;
                            $('#btn_kelompok').show();
                            $('#btn_kelut').show();
                            $('#btn_subkel').show();
                        }
                        else {
                            btn_divisi.disabled = false;
                            btn_objek.disabled = false;
                            $('#btn_kelompok').hide();
                            $('#btn_kelut').hide();
                            $('#btn_subkel').hide();
                        }
                    },
                    error: function (xhr, status, error) {
                        console.error('Error:', error);
                    }
                });
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


// button list divisi
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
                        order: [1, "asc"],
                        ajax: {
                            url: "TerimaPurchasing/getDivisi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdDivisi" },
                            { data: "NamaDivisi" },
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
                divisiNama.value = result.value.NamaDivisi.trim();
                btn_objek.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list objek
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
                        order: [1, "asc"],
                        ajax: {
                            url: "TerimaPurchasing/getObjek",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                divisi: divisiId.value
                            }
                        },
                        columns: [
                            { data: "IdObjek" },
                            { data: "NamaObjek" },
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
                objekNama.value = result.value.NamaObjek.trim();

                callAllData();
            }
        });
    } catch (error) {
        console.error(error);
    }
});


// button list kelompok utama
btn_kelut.addEventListener("click", function (e) {

    try {
        Swal.fire({
            title: 'Kelompok Utama',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok Utama</th>
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
                        order: [0, "asc"],
                        ajax: {
                            url: "TerimaPurchasing/getKelUt",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdObjek_KelompokUtama: objekId.value.trim(),
                                KodeBarang: kodeBarang.value.trim(),
                            }
                        },
                        columns: [
                            { data: "IdKelompokUtama" },
                            { data: "NamaKelompokUtama" }
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
                kelutId.value = result.value.IdKelompokUtama.trim();
                kelutNama.value = result.value.NamaKelompokUtama.trim();

                kelompokId.value = '';
                kelompokNama.value = '';
                subkelId.value = '';
                subkelNama.value = '';
                kodeType.value = '';

                btn_kelompok.disabled = false;
                btn_kelompok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list kelompok
btn_kelompok.addEventListener("click", function (e) {

    try {
        Swal.fire({
            title: 'Kelompok',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Nama Kelompok</th>
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
                        order: [1, "asc"],
                        ajax: {
                            url: "TerimaPurchasing/getKelompok",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdKelompokUtama_Kelompok: kelutId.value.trim(),
                                KodeBarang: kodeBarang.value.trim(),
                            }
                        },
                        columns: [
                            { data: "IdKelompok" },
                            { data: "NamaKelompok" }
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
                kelompokId.value = result.value.IdKelompok.trim();
                kelompokNama.value = result.value.NamaKelompok.trim();

                subkelId.value = '';
                subkelNama.value = '';
                kodeType.value = '';

                btn_subkel.disabled = false;
                btn_subkel.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

// button list sub kelompok
btn_subkel.addEventListener("click", function (e) {

    try {
        Swal.fire({
            title: 'Sub Kelompok',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID Sub Kelompok</th>
                            <th scope="col">Nama Sub Kelompok</th>
                            <th scope="col">Id Type</th>
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
                        order: [1, "asc"],
                        ajax: {
                            url: "TerimaPurchasing/getSubkel",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken,
                                XIdKelompok_SubKelompok: kelompokId.value.trim(),
                                KodeBarang: kodeBarang.value,
                            }
                        },
                        columns: [
                            { data: "IdSubkelompok" },
                            { data: "NamaSubKelompok" },
                            { data: "IdType" },
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
                subkelId.value = result.value.IdSubkelompok.trim();
                subkelNama.value = result.value.NamaSubKelompok.trim();
                kodeType.value = result.value.IdType.trim();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

btn_batal.addEventListener("click", function (e) {
    clearText();

    btn_proses.disabled = true;
    btn_batal.disabled = true;

    $('#btn_kelompok').hide();
    $('#btn_kelut').hide();
    $('#btn_subkel').hide();

    btn_divisi.disabled = false;
    btn_objek.disabled = false;

    btn_divisi.focus();
});

btn_proses.addEventListener("click", function (e) {
    var table = $('#tableData').DataTable();

    if (table.$('tr.selected').length > 0) {
        if (kodeType.value === '') {
            Swal.fire({
                icon: 'error',
                title: 'Lengkapi Terlebih Dahulu Data Yang Harus diProses !!..',
                returnFocus: false
            });
            return;
        }
        else {
            $.ajax({
                type: 'GET',
                url: 'TerimaPurchasing/cekPenyesuaianTransaksi',
                data: {
                    IdType: kodeType.value,
                    _token: csrfToken
                },
                success: function (result) {
                    if (result[0].jumlah >= 1) {
                        Swal.fire({
                            icon: 'error',
                            text: 'Tidak Bisa DiAcc !!!. Karena Ada Transaksi Penyesuaian yang Belum Diacc untuk type ',
                            returnFocus: false,
                        });
                        return;
                    }
                    else {
                        $.ajax({
                            type: 'PUT',
                            url: 'TerimaPurchasing/prosesTerimaTransferBeli',
                            data: {
                                IdTransaksi: kodeTransaksi.value,
                                IdType: kodeType.value,
                                IdSubKel: subkelId.value,
                                Penerima: penerima.value,
                                MasukPrimer: primer.value,
                                MasukSekunder: sekunder.value,
                                MasukTritier: tritier.value,
                                _token: csrfToken
                            },
                            success: function (response) {
                                if (response.success) {
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Success',
                                        text: response.success,
                                    }).then(() => {
                                        callAllData();
                                        clearProses();

                                        btn_kelut.disabled = true;
                                        btn_subkel.disabled = true;
                                        
                                        $('#btn_kelompok').hide();
                                        $('#btn_kelut').hide();
                                        $('#btn_subkel').hide();
                                    
                                    });

                                }
                            },
                            error: function (xhr, status, error) {
                                console.error('Error:', error);
                            }
                        });
                    }

                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Tidak ada data yang diPROSES!..,Pilih Dulu!!..',
            returnFocus: false
        });
        return;
    }
});

function callAllData() {
    $.ajax({
        type: 'GET',
        url: 'TerimaPurchasing/callAllData',
        data: {
            IdDivisi: divisiId.value,
            IdObjek: objekId.value,
            _token: csrfToken
        },
        success: function (result) {
            if (result.length !== 0) {
                updateDataTable(result);

                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data di tabel sudah diupdate.',
                });
                btn_proses.disabled = false;
                btn_batal.disabled = false;
            }
            else {
                var table = $('#tableData').DataTable();
                table.clear().draw();

                Swal.fire({
                    icon: 'info',
                    text: 'Tidak Ada Data.',
                });
            }

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
}

function clearProses() {
    kelompokNama.value = '';
    kelutNama.value = '';
    subkelNama.value = '';

    kelompokId.value = '';
    kelutId.value = '';
    subkelId.value = '';

    kodeTransaksi.value = '';
    tanggal.value = '';
    pib.value = '';
    kodeBarang.value = '';
    kodeType.value = '';
    namaBarang.value = '';

    primer.value = '';
    satuanPrimer.value = '';
    sekunder.value = '';
    satuanSekunder.value = '';
    tritier.value = '';
    satuanTritier.value = '';
}

function clearText() {
    // Divisi section
    divisiNama.value = '';
    objekNama.value = '';
    kelompokNama.value = '';
    kelutNama.value = '';
    subkelNama.value = '';

    // Hidden ID inputs
    divisiId.value = '';
    objekId.value = '';
    kelompokId.value = '';
    kelutId.value = '';
    subkelId.value = '';

    // Kode Transaksi section
    kodeTransaksi.value = '';
    tanggal.value = '';
    pib.value = '';
    kodeBarang.value = '';
    kodeType.value = '';
    namaBarang.value = '';

    // Jumlah Barang section
    primer.value = '';
    satuanPrimer.value = '';
    sekunder.value = '';
    satuanSekunder.value = '';
    tritier.value = '';
    satuanTritier.value = '';

    var table = $('#tableData').DataTable();
    table.clear().draw();
}