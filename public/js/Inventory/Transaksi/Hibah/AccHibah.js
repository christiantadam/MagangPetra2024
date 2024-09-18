var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var acc = document.getElementById('acc');
var batalAcc = document.getElementById('batalAcc');
var divisiId = document.getElementById('divisiId');
var divisiNama = document.getElementById('divisiNama');
var btn_divisi = document.getElementById('btn_divisi');
var btn_ok = document.getElementById('btn_ok');
var objekNama = document.getElementById('objekNama');
var kelompokNama = document.getElementById('kelompokNama');
var kelutNama = document.getElementById('kelutNama');
var subkelNama = document.getElementById('subkelNama');
var transaksiId = document.getElementById('transaksiId');
var namaType = document.getElementById('namaType');
var primer = document.getElementById('primer');
var satuanPrimer = document.getElementById('satuanPrimer');
var sekunder = document.getElementById('sekunder');
var satuanSekunder = document.getElementById('satuanSekunder');
var triter = document.getElementById('triter');
var satuanTritier = document.getElementById('satuanTritier');
var btn_batal = document.getElementById('btn_batal');
var btn_proses = document.getElementById('btn_proses');

$(document).ready(function () {
    $('#tableData').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
        columns: [
            // { title: 'Status' },
            { title: 'Kode Trans' },
            { title: 'Nama Brg' },
            { title: 'Pemberi Hibah' },
            { title: 'Kel Utama' },
            { title: 'Kelompok' },
            { title: 'Sub Kelompok' },
            { title: 'Pemohon' },
            { title: 'Primer' },
            { title: 'Sekunder' },
            { title: 'Tritier' },
            { title: 'Acc' },
        ],
        scrollY: '300px',
        autoWidth: false,
        scrollX: '100%',
        columnDefs: [{ targets: [0], width: '12%', className: 'fixed-width' },
        { targets: [1], width: '25%', className: 'fixed-width' },
        { targets: [2], width: '20%', className: 'fixed-width' },
        { targets: [3], width: '8%', className: 'fixed-width' },
        { targets: [4], width: '8%', className: 'fixed-width' },
        { targets: [5], width: '8%', className: 'fixed-width' },
        { targets: [6], width: '8%', className: 'fixed-width' },
        { targets: [7], width: '8%', className: 'fixed-width' },
        { targets: [8], width: '8%', className: 'fixed-width' },
        { targets: [9], width: '8%', className: 'fixed-width' },
        { targets: [10], width: '8%', className: 'fixed-width'}]
    });
});

function formatNumber(value) {
    if (!isNaN(parseFloat(value)) && isFinite(value)) {
        return parseFloat(value).toFixed(2);
    }
    return value;
}


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

$('#tableData tbody').on('click', 'tr', function () {
    var table = $('#tableData').DataTable();
    table.$('tr.selected').removeClass('selected');
    $(this).addClass('selected');
    var data = table.row(this).data();

    objekNama.value = decodeHtmlEntities(data[11]);
    transaksiId.value = decodeHtmlEntities(data[0]);
    namaType.value = decodeHtmlEntities(data[1]);
    kelutNama.value = decodeHtmlEntities(data[3]);
    kelompokNama.value = decodeHtmlEntities(data[4]);
    subkelNama.value = decodeHtmlEntities(data[5]);
    primer.value = formatNumber(data[7]);
    sekunder.value = formatNumber(data[8]);
    triter.value = formatNumber(data[9]);

    $.ajax({
        type: 'GET',
        url: 'AccPermohonanHibah/getDetailData',
        data: {
            XIdTransaksi: transaksiId.value,
            _token: csrfToken
        },
        success: function (result) {
            if (result) {
                satuanPrimer.value = result[0].Satuan_Primer ?? '';
                satuanSekunder.value = result[0].Satuan_Sekunder ?? '';
                satuanTritier.value = result[0].Satuan_Tritier ?? '';
            }
            else {
                triter.value = '';
                primer.value = '';
                sekunder.value = '';
            }
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
        }
    });
});

function updateDataTable(data) {
    var table = $('#tableData').DataTable();
    table.clear().draw();

    if (batalAcc.checked == true) {
        data.forEach(function (item) {
            table.row.add([
                escapeHtml(item.IdTransaksi),
                escapeHtml(item.NamaType),
                escapeHtml(item.UraianDetailTransaksi),
                escapeHtml(item.NamaKelompokUtama),
                escapeHtml(item.NamaKelompok),
                escapeHtml(item.NamaSubKelompok),
                escapeHtml(item.IdPemberi),
                formatNumber(item.JumlahPemasukanPrimer),
                formatNumber(item.JumlahPemasukanSekunder),
                formatNumber(item.JumlahPemasukanTritier),
                escapeHtml(item.KomfirmasiPemberi),
                escapeHtml(item.NamaObjek),
            ]);
        });
    }

    else if (acc.checked == true) {
        data.forEach(function (item) {
            table.row.add([
                escapeHtml(item.IdTransaksi),
                escapeHtml(item.NamaType),
                escapeHtml(item.UraianDetailTransaksi),
                escapeHtml(item.NamaKelompokUtama),
                escapeHtml(item.NamaKelompok),
                escapeHtml(item.NamaSubKelompok),
                escapeHtml(item.IdPemberi),
                formatNumber(item.JumlahPemasukanPrimer),
                formatNumber(item.JumlahPemasukanSekunder),
                formatNumber(item.JumlahPemasukanTritier),
                '',
                escapeHtml(item.NamaObjek),
            ]);
        });
    }


    table.draw();
}

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
                            url: "AccPermohonanHibah/getDivisi",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "IdDivisi" },
                            { data: "NamaDivisi" },
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
                divisiId.value = decodeHtmlEntities(result.value.IdDivisi.trim());
                divisiNama.value = decodeHtmlEntities(result.value.NamaDivisi.trim());
                btn_ok.focus();
            }
        });
    } catch (error) {
        console.error(error);
    }
});

function clearInputs() {
    objekNama.value = '';
    kelutNama.value = '';
    kelompokNama.value = '';
    subkelNama.value = '';
    transaksiId.value = '';
    namaType.value = '';
    primer.value = '';
    sekunder.value = '';
    triter.value = '';
    satuanPrimer.value = '';
    satuanSekunder.value = '';
    satuanTritier.value = '';
}

btn_batal.addEventListener("click", function (e) {
    clearInputs();
    btn_batal.disabled = true;
    btn_proses.disabled = true;
    btn_divisi.disabled = false;
    acc.disabled = false;
    batalAcc.disabled = false;

    var table = $('#tableData').DataTable();
    table.clear().draw();
});

btn_ok.addEventListener("click", function (e) {

    if (divisiId.value == '') {
        Swal.fire({
            icon: 'error',
            title: 'Isi divisi terlebih dahulu!',
            returnFocus: false
        });
        return;
    }

    else {
        btn_proses.disabled = false;
        btn_batal.disabled = false;
        acc.disabled = true;
        batalAcc.disabled = true;
        btn_divisi.disabled = true;

        var table = $('#tableData').DataTable();

        clearInputs();

        if (acc.checked == true) {
            $.ajax({
                type: 'GET',
                url: 'AccPermohonanHibah/belumAcc',
                data: {
                    _token: csrfToken,
                    XIdDivisi: divisiId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data di tabel sudah diupdate.',
                        });
                    }
                    else {
                        table.clear().draw();

                        Swal.fire({
                            icon: 'info',
                            title: 'Tidak ada Data!',
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }

        else if (batalAcc.checked == true) {
            $.ajax({
                type: 'GET',
                url: 'AccPermohonanHibah/sudahAcc',
                data: {
                    _token: csrfToken,
                    XIdDivisi: divisiId.value,
                },
                success: function (result) {
                    if (result.length !== 0) {
                        updateDataTable(result);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Data di tabel sudah diupdate.',
                        });
                    }
                    else {
                        table.clear().draw();

                        Swal.fire({
                            icon: 'info',
                            title: 'Tidak ada Data!',
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    }

});

btn_proses.addEventListener("click", function (e) {
    var table = $('#tableData').DataTable();

    if (acc.checked === true && transaksiId.value) {
        $.ajax({
            type: 'PUT',
            url: 'AccPermohonanHibah/accHibah',
            data: {
                _token: csrfToken,
                YIdTransaksi: transaksiId.value,
            },
            success: function (result) {
                if (result.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: result.success,
                        returnFocus: false,
                    }).then(() => {
                        $.ajax({
                            type: 'GET',
                            url: 'AccPermohonanHibah/belumAcc',
                            data: {
                                _token: csrfToken,
                                XIdDivisi: divisiId.value,
                            },
                            success: function (result) {
                                if (result.length !== 0) {
                                    updateDataTable(result);
                                } else {
                                    table.clear().draw();
                                }
                                clearInputs();
                            },
                            error: function (xhr, status, error) {
                                console.error('Error:', error);
                            }
                        });
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }



    else if (batalAcc.checked === true && transaksiId.value) {
        $.ajax({
            type: 'PUT',
            url: 'AccPermohonanHibah/batalAccHibah',
            data: {
                _token: csrfToken,
                YIdTransaksi: transaksiId.value,
            },
            success: function (result) {
                if (result.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: result.success,
                        returnFocus: false,
                    }).then(() => {
                        $.ajax({
                            type: 'GET',
                            url: 'AccPermohonanHibah/sudahAcc',
                            data: {
                                _token: csrfToken,
                                XIdDivisi: divisiId.value,
                            },
                            success: function (result) {
                                if (result.length !== 0) {
                                    updateDataTable(result);
                                } else {
                                    table.clear().draw();
                                }
                                clearInputs();
                            },
                            error: function (xhr, status, error) {
                                console.error('Error:', error);
                            }
                        });
                    });
                }
            },
            error: function (xhr, status, error) {
                console.error('Error:', error);
            }
        });
    }

});
