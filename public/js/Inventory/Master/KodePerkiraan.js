var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

var kode = document.getElementById('kode');
var keterangan = document.getElementById('keterangan');

var btn_lihat = document.getElementById('btn_lihat');
var btn_isi = document.getElementById('btn_isi');
var btn_proses = document.getElementById('btn_proses');
var btn_batal = document.getElementById('btn_batal');
var btn_koreksi = document.getElementById('btn_koreksi');
var btn_hapus = document.getElementById('btn_hapus');

let a; // isi = 1, koreksi = 2, hapus = 3
const inputs = Array.from(document.querySelectorAll('.card-body input[type="text"]:not([readonly]), .card-body input[type="date"]:not([readonly])'));

btn_isi.focus();

inputs.forEach((masuk, index) => {
    masuk.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            if (masuk.id === 'keterangan') {
                btn_proses.focus();
            } else { inputs[index + 1].focus(); }

        }
    })
});

// button list kode perkiraan
btn_lihat.addEventListener("click", function (e) {
    try {
        Swal.fire({
            title: 'Kode Perkiraan',
            html: `
                <table id="table_list" class="table">
                    <thead>
                        <tr>
                        <th scope="col">No Kode Perkiraan</th>
                            <th scope="col">Keterangan</th>
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
            width: '55%',
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
                        order: [0, "asc"],
                        ajax: {
                            url: "KodePerkiraan/getAllKodePerkiraan",
                            dataType: "json",
                            type: "GET",
                            data: {
                                _token: csrfToken
                            }
                        },
                        columns: [
                            { data: "NoKodePerkiraan" },
                            { data: "Keterangan" }
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
                kode.value = result.value.NoKodePerkiraan;
                keterangan.value = result.value.Keterangan.trim();
                if (a === 2) {
                    keterangan.focus();
                } else {
                    btn_proses.focus();
                }
            }
        });
    } catch (error) {
        console.error(error);
    }
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

// button proses
btn_proses.addEventListener("click", function (e) {
    try {
        if (kode.value === '' || keterangan.value === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Data Belum Lengkap Terisi',
                text: 'Isi Semua Data Terlebih Dahulu !',
            });
        } else {
            $.ajax({
                type: 'GET',
                url: 'KodePerkiraan/getPerkiraan',
                data: {
                    _token: csrfToken,
                    kode: kode.value,
                    keterangan: keterangan.value,
                    a: a
                },
                timeout: 30000,
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: response.success,
                        }).then(() => {
                            kode.value = '';
                            keterangan.value = '';
                            disableKetik();
                            btn_isi.focus();
                        });
                    } else if (response.error) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Kode Perkiraan Sudah Ada !',
                            text: response.error,
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);
                }
            });
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

var Ketik = document.querySelectorAll('input');

disableKetik();

// fungsi bisa ketik
function enableKetik() {
    Ketik.forEach(function (input) {
        input.value = '';
        input.disabled = false;
    });

    // btn_lihat.disabled = false;

    // hide button isi, tampilkan button proses
    btn_isi.style.display = 'none';
    btn_proses.style.display = 'inline-block';
    // hide button koreksi, tampilkan button batal
    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';
}

// fungsi gak bisa ketik
function disableKetik() {
    Ketik.forEach(function (input) {
        input.value = '';
        input.disabled = true;
    });

    btn_lihat.disabled = true;

    // hide button proses, tampilkan button isi
    btn_proses.style.display = 'none';
    btn_isi.style.display = 'inline-block';

    // hide button batal, tampilkan button koreksi
    btn_batal.style.display = 'none';
    btn_koreksi.style.display = 'inline-block';

    btn_hapus.disabled = false;
}

// button isi event listener
btn_isi.addEventListener('click', function () {
    a = 1;
    enableKetik();
    kode.focus();
    btn_lihat.disabled = true;
    btn_hapus.disabled = true;
});

// button batal event listener
btn_batal.addEventListener('click', function () {
    btn_hapus.disabled = false;
    disableKetik();
});

// button koreksi event listener
btn_koreksi.addEventListener('click', function () {
    a = 2;
    enableKetik();
    kode.disabled = true;
    btn_lihat.disabled = false;
    btn_lihat.focus();
    btn_hapus.disabled = true;
});

// button hapus event listener
btn_hapus.addEventListener('click', function () {
    a = 3;
    btn_isi.style.display = 'none';
    btn_proses.style.display = 'inline-block';

    btn_koreksi.style.display = 'none';
    btn_batal.style.display = 'inline-block';

    btn_lihat.disabled = false;
    btn_hapus.disabled = true;
    btn_lihat.focus();
});
