@extends('layouts.appQC')
@section('content')
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-10 RDZMobilePaddingLR0">
                @if (Session::has('success'))
                    <div class="alert alert-success">
                        {{ Session::get('success') }}
                    </div>
                @elseif (Session::has('error'))
                    <div class="alert alert-danger">
                        {{ Session::get('error') }}
                    </div>
                @endif
                <div class="card">
                    <div class="card-header">INPUT AFALAN</div>
                    <div class="card-body RDZOverflow RDZMobilePaddingLR0">
                        <div class="acs-div-container">
                            <div class="acs-div-container1">
                                <form>
                                    <div class="form-group">
                                        <label for="no_roll">No Roll</label>
                                        <div class="input-group">
                                            <input type="text" id="no_roll" name="no_roll" class="form-control"
                                                readonly>
                                            <div class="input-group-append">
                                                <button type="button" class="btn btn-primary"
                                                    id="btn_noRoll">Pilih</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="item_number">Item Number</label>
                                        <input type="double" id="item_number" name="item_number" class="form-control"
                                            readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="kode_barang">Kode Barang</label>
                                        <input type="text" id="kode_barang" name="kode_barang" class="form-control"
                                            readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="nama_type">Nama Type</label>
                                        <input type="text" id="nama_type" name="nama_type" class="form-control" readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="meter_bruto">Meter Bruto</label>
                                        <input type="double" id="meter_bruto" name="meter_bruto" class="form-control"
                                            readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="meter_netto">Meter Netto</label>
                                        <input type="double" id="meter_netto" name="meter_netto" class="form-control"
                                            readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="kg">KG</label>
                                        <input type="double" id="kg" name="kg" class="form-control" readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="afalan">Afalan (Angka)</label>
                                        <input type="double" id="afalan" name="afalan" class="form-control"
                                            placeholder="0" min="0" required>
                                    </div>
                                    <button id="btn_submit" class="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript" src="{{ asset('js/QC/Afalan/InputAfalan.js') }}"></script>
    <link rel="stylesheet" href="{{ asset('css/sweetalert2.min.css') }}">
    <script src="{{ asset('js/sweetalert2.all.min.js') }}"></script>
@endsection
