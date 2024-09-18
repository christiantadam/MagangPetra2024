@extends('layouts.AppInventory')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                <div class="card">
                    <div class="card-header">Terima Benang Untuk CL
                    </div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">

                        <label>Penerima</label>
                        <div class="baris-1 pl-3" id="baris-1">
                            <div class="row pt-2" id="divisiTanggal">
                                <div class="col-2">
                                    <label for="divisiId">Divisi</label>
                                </div>
                                <div class="col-sm-3 pl-2 mr-3">
                                    <input type="text" class="form-control" id="divisiNama" name="divisiNama" readonly>
                                </div>

                                <button type="button" id="btn_ok" class="btn btn-info btn-sm">OK</button>
                                <div class="col-sm-3"></div>

                                <div class="col-1">
                                    <label for="tanggal">Tanggal</label>
                                </div>
                                <div class="col-sm-2">
                                    <input type="date" class="form-control" id="tanggal">
                                </div>
                            </div>

                            <div class="row pr-5" id="objUser">
                                <div class="col-sm-2">
                                    <label for="objekId">Objek</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="objekNama" name="objekNama" readonly>
                                </div>
                                <div class="col-sm-3"></div>
                                <div class="col-sm-2">
                                    <label for="user">User Yg Menerima</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="text" class="form-control" id="user" name="user" readonly>
                                </div>
                            </div>

                            <div class="row" id="ids" style="display:none;">
                                <input type="text" id="objekId" name="objekId" class="form-control" readonly>
                            </div>

                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="kelutId">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kelutNama" name="kelutNama" readonly>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="kelompokId">&nbsp;Kelompok</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kelompokNama" name="kelompokNama"
                                        readonly>
                                </div>
                            </div>

                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label>Kode Transaksi</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kodeTransaksi" name="kodeTransaksi"
                                        readonly>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="subkelId">&nbsp;Sub Kelompok</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="subkelNama" name="subkelNama" readonly>
                                </div>
                            </div>

                            <div class="row pr-5">
                                <div class="col-sm-2">
                                    <label for="namaBarang">Nama Barang</label>
                                </div>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="namaBarang" name="namaBarang" readonly>
                                </div>
                            </div>

                            <div class="row pb-2">
                                <div class="col-sm-2 mr-2">
                                    <label>Jumlah Barang</label>
                                </div>
                                <div class="col-sm-2 pr-1 pl-0">
                                    <input type="text" class="form-control" id="primer" name="primer">
                                </div>
                                <div class="col-sm-1 pl-1">
                                    <input type="text" class="form-control" id="no_primer" name="no_primer" readonly>
                                </div>
                                <div class="col-sm-2 pr-1 pl-0">
                                    <input type="text" class="form-control" id="sekunder" name="sekunder">
                                </div>
                                <div class="col-sm-1 pl-1">
                                    <input type="text" class="form-control" id="no_sekunder" name="no_sekunder"
                                        readonly>
                                </div>
                                <div class="col-sm-2 pr-1 pl-0">
                                    <input type="text" class="form-control" id="tritier" name="tritier">
                                </div>
                                <div class="col-sm-1 pl-1">
                                    <input type="text" class="form-control" id="no_tritier" name="no_tritier"
                                        readonly>
                                </div>
                            </div>
                        </div>

                        <label>Pemberi</label>
                        <div class="baris-2 pl-3" id="baris-2">
                            <div class="row pt-2">
                                <div class="col-sm-5"></div>
                                <div class="col-sm-2 pl-5">
                                    <label for="kelutId">Kelompok Utama</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kelutNama2" name="kelutNama2" readonly>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-2">
                                    <label for="divisiId">Divisi</label>
                                </div>
                                <div class="col-sm-3 pl-2">
                                    <input type="text" class="form-control" id="divisiNama2" name="divisiNama2" readonly>
                                </div>
                                <div class="col-sm-2 pl-5">
                                    <label for="kelompokId">&nbsp;Kelompok</label>
                                </div>
                                <div class="col-sm-3">
                                    <input type="text" class="form-control" id="kelompokNama2" name="kelompokNama2" readonly>
                                </div>
                            </div>

                            <div class="row pr-5 pb-2">
                                <div class="col-sm-2" style="margin-right: 1%">
                                    <label for="objekId">Objek</label>
                                </div>
                                <div class="col-sm-3 pl-1">
                                    <input type="text" class="form-control" id="objekNama2" name="objekNama2" readonly>
                                </div>
                                <div class="col-sm-2 mr-3" style="padding-left: 5%;">
                                    <label for="subkelId">Sub Kelompok</label>
                                </div>
                                <div class="col-sm-3 pr-0">
                                    <input type="text" class="form-control" id="subkelNama2" name="subkelNama2" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="col-sm-12">
                            <div class="col-sm-12 mb-2">
                                <div class="table-responsive fixed-height">
                                    <table class="table table-bordered no-wrap-header" id="tableData">
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex">
                            <div class="baris-3 pl-3 col-sm-6" id="baris-3">
                                <div class="row pt-2">
                                    <div class="col-sm-4">
                                        <label>Type Konversi</label>
                                    </div>
                                    <div class="col-sm-3 p-0">
                                        <input type="text" class="form-control" id="typeKonv" name="typeKonv">
                                    </div>
                                    <div class="col-sm-3 pr-0">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="idKonv" name="idKonv">
                                            <div class="input-group-append">
                                                <button type="button" id="btn_typeKonv" class="btn btn-info">...</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-4">
                                        <label>ID Transaksi Acuan</label>
                                    </div>
                                    <div class="col-sm-6 p-0">
                                        <input type="text" class="form-control" id="idTrans" name="idTrans">
                                    </div>
                                </div>

                                <button type="button" id="btn_konversi" class="btn btn-info btn-sm">Proses Konversi</button>
                            </div>

                            <div class="col-sm-6">
                                <div class="button-container">
                                    <div class="button-group">
                                        <button type="button" id="btn_refresh" class="btn btn-info">Refresh</button>
                                    </div>
                                    <div class="button-group">
                                        <button type="button" id="btn_proses" class="btn btn-info">Proses</button>
                                        <button type="button" id="btn_batal" class="btn btn-info">Batal</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <link rel="stylesheet" href="{{ asset('css/Inventory/Transaksi/Mutasi/PermohonanPenerimaBenang.css') }}">
    <script src="{{ asset('js/Inventory/Transaksi/Mutasi/PermohonanPenerimaBenang.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/colResizeDatatable.css') }}">
    <script src="{{ asset('js/colResizeDatatable.js') }}"></script>
@endsection
