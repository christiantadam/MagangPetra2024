<?php

namespace App\Http\Controllers\QC\Extruder;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class QCExtruderTropodoController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('QC');
        return view('QC.Extruder.ExtruderTropodo', compact('access'));
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {
        // ambil nomor transaksi
        if ($id == 'getNomorTransaksi') {
            $tgl = $request->input('tgl');
            $Shift = $request->input('Shift');
            $Mesin = $request->input('Mesin');

            $listTransaksi = DB::connection('ConnExtruder')
                ->select('exec SP_1273_QC_LIST_KOREKSIMASTERQC @tgl = ?, @Shift = ?, @Mesin = ?', [$tgl, $Shift, $Mesin]);
            $dataNoTransaksi = [];
            foreach ($listTransaksi as $NoTransaksi) {
                $dataNoTransaksi[] = [
                    'NoTrans' => $NoTransaksi->NoTrans,
                    'Trans' => $NoTransaksi->Trans,
                ];
            }
            return datatables($dataNoTransaksi)->make(true);
        }

        // ambil id mesin
        else if ($id == 'getIdMesin') {
            $tgl = $request->input('tgl');
            $Shift = $request->input('Shift');

            $listIdMesin = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_SPEKBNG @kode = ?, @tgl = ?, @Shift = ?, @Divisi = ?', [1, $tgl, $Shift, "EXT"]);
            $dataIdMesin = [];
            foreach ($listIdMesin as $listMesin) {
                $dataIdMesin[] = [
                    'IdMesin' => $listMesin->IdMesin,
                    'NamaMesin' => $listMesin->TypeMesin,
                ];
            }
            return datatables($dataIdMesin)->make(true);
        }

        // ambil shift awal akhir
        else if ($id == 'getShiftData') {
            $tgl = $request->input('tgl');
            $Shift = $request->input('Shift');
            $mesin = $request->input('IdMesin');

            $listShift = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_SPEKBNG @kode = ?, @tgl = ?, @Shift = ?, @mesin = ?', [3, $tgl, $Shift, $mesin]);
            $dataShiftarr = [];
            foreach ($listShift as $dataShift) {
                $dataShiftarr[] = [
                    'AwalShift' => $dataShift->AwalShift,
                    'AkhirShift' => $dataShift->AkhirShift,
                ];
            }
            return response()->json($dataShiftarr);
        }

        // ambil spek benang
        else if ($id == 'getSpekBenang') {
            $tgl = $request->input('tgl');
            $Shift = $request->input('Shift');
            $mesin = $request->input('mesin');

            $listSpekBenang = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_SPEKBNG @kode = ?, @tgl = ?, @shift = ?, @mesin = ?', [2, $tgl, $Shift, $mesin]);
            $dataSpekBenangArr = [];
            foreach ($listSpekBenang as $listSpek) {
                $dataSpekBenangArr[] = [
                    'TypeBenang' => $listSpek->TypeBenang,
                    'IdMesin' => $listSpek->IdMesin,
                ];
            }
            return datatables($dataSpekBenangArr)->make(true);
        }

        // ambil id konversi
        else if ($id == 'getIdKonversi') {
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $mesin = $request->input('mesin');
            $benang = $request->input('benang');

            $idKonversiConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_SPEKBNG @kode = ?,
                @tgl = ?,
                @shift = ?,
                @mesin = ?,
                @benang = ?', [4, $tgl, $shift, $mesin, $benang]);
            $idKonversiArr = [];
            foreach ($idKonversiConn as $listKonv) {
                $idKonversiArr[] = [
                    'IdKonversi' => $listKonv->IdKonversi,
                ];
            }
            return response()->json($idKonversiArr);
        }

        // PROSEN DAN QUANTITY
        // ambil data list Bahan Baku
        else if ($id == 'getBahanBaku') {
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $nama = $request->input('nama');
            $benang = $request->input('benang');

            $idKonversiConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_BAHAN_KONV
                @kode = ?,
                @tgl = ?,
                @shift = ?,
                @nama = ?,
                @benang = ?',
                    [
                        1,
                        $tgl,
                        $shift,
                        $nama,
                        $benang
                    ]
                );
            $idKonversiArr = [];
            foreach ($idKonversiConn as $listKonv) {
                $idKonversiArr[] = [
                    'Merk' => $listKonv->Merk,
                    'IdType' => $listKonv->IdType,
                ];
            }
            return datatables($idKonversiArr)->make(true);
        }

        // ambil quantity bahan baku
        else if ($id == 'getQuantityBahanBaku') {
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $nama = $request->input('nama');
            $benang = $request->input('benang');
            $type = $request->input('type');

            $quantityBahanBakuConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_BAHAN_KONV @kode = ?,
                @tgl = ?,
                @shift = ?,
                @nama = ?,
                @benang = ?,
                @type = ?', [4, $tgl, $shift, $nama, $benang, $type]);
            $quantityBahanBakuArr = [];
            foreach ($quantityBahanBakuConn as $listQuantity) {
                $quantityBahanBakuArr[] = [
                    'Quantity' => $listQuantity->JumlahTritier,
                    'Prosentase' => $listQuantity->Persentase,
                    'StatusType' => $listQuantity->StatusType,
                    'NamaKelompok' => $listQuantity->NamaKelompok
                ];
            }
            return response()->json($quantityBahanBakuArr);
        }

        // selain bahan baku, ambil data
        else if (
            $id == 'getCalpetCaco3' || $id == 'getMasterBath' || $id == 'getUv' || $id == 'getAntiStatic' || $id == 'getPeletan' ||
            $id == 'getAdditif' || $id == 'getLldpe' || $id == 'getLdpeLami' || $id == 'getLdpe' || $id == 'getConductive' ||
            $id == 'getHdpe' || $id == 'getSweeping' || $id == 'getInjection'
        ) {
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $nama = $request->input('nama');
            $benang = $request->input('benang');

            // kalau buat table
            switch ($id) {
                case 'getCalpetCaco3':
                    $kelompok = 'CACO3';
                    $kelompok1 = 'Calpet';
                    break;

                case 'getMasterBath':
                    $kelompok1 = '';
                    $kelompok = 'Masterbath';
                    break;

                case 'getUv':
                    $kelompok1 = '';
                    $kelompok = 'UV';
                    break;

                case 'getAntiStatic':
                    $kelompok1 = '';
                    $kelompok = 'Anti Static';
                    break;

                case 'getPeletan':
                    $kelompok1 = '';
                    $kelompok = 'Pelletan';
                    break;

                case 'getAdditif':
                    $kelompok1 = '';
                    $kelompok = 'Additif';
                    break;

                case 'getLldpe':
                    $kelompok1 = '';
                    $kelompok = 'LLDPE';
                    break;

                case 'getLdpeLami':
                    $kelompok1 = '';
                    $kelompok = 'LDPE Lami';
                    break;

                case 'getLdpe':
                    $kelompok1 = '';
                    $kelompok = 'LDPE';
                    break;

                case 'getConductive':
                    $kelompok1 = '';
                    $kelompok = 'Conductive';
                    break;

                case 'getHdpe':
                    $kelompok1 = '';
                    $kelompok = 'HDPE';
                    break;

                case 'getSweeping':
                    $kelompok1 = '';
                    $kelompok = 'Sweeping';
                    break;

                case 'getInjection':
                    $kelompok1 = '';
                    $kelompok = 'PP Injection';
                    break;

                default:
                    $kelompok = '';
                    $kelompok1 = '';
                    break;
            }

            $merkConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_BAHAN_KONV
                @kode = ?,
                @tgl = ?,
                @shift = ?,
                @nama = ?,
                @benang = ?,
                @kelompok = ?,
                @kelompok1 = ?',
                    [
                        2,
                        $tgl,
                        $shift,
                        $nama,
                        $benang,
                        $kelompok,
                        $kelompok1
                    ]
                );
            $merkArr = [];
            foreach ($merkConn as $listMerk) {
                $merkArr[] = [
                    'Merk' => $listMerk->Merk,
                    'IdType' => $listMerk->IdType,
                ];
            }
            return datatables($merkArr)->make(true);
        }

        // kalau cari quantity dan prosen
        else if (
            $id == 'getCalpetCaco3Quantity' || $id == 'getMasterBathQuantity' || $id == 'getUvQuantity' || $id == 'getAntiStaticQuantity' ||
            $id == 'getPeletanQuantity' || $id == 'getAdditifQuantity' || $id == 'getLldpeQuantity' || $id == 'getLdpeLamiQuantity' ||
            $id == 'getLdpeQuantity' || $id == 'getConductiveQuantity' || $id == 'getHdpeQuantity' || $id == 'getSweepingQuantity' ||
            $id == 'getInjectionQuantity'
        ) {
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $nama = $request->input('nama');
            $benang = $request->input('benang');
            $type = $request->input('type');

            switch ($id) {
                case 'getCalpetCaco3Quantity':
                    $kelompok = 'CACO3';
                    $kelompok1 = 'Calpet';
                    break;

                case 'getMasterBathQuantity':
                    $kelompok1 = '';
                    $kelompok = 'Masterbath';
                    break;

                case 'getUvQuantity':
                    $kelompok1 = '';
                    $kelompok = 'UV';
                    break;

                case 'getAntiStaticQuantity':
                    $kelompok1 = '';
                    $kelompok = 'Anti Static';
                    break;

                case 'getPeletanQuantity':
                    $kelompok1 = '';
                    $kelompok = 'Pelletan';
                    break;

                case 'getAdditifQuantity':
                    $kelompok1 = '';
                    $kelompok = 'Additif';
                    break;

                case 'getLldpeQuantity':
                    $kelompok1 = '';
                    $kelompok = 'LLDPE';
                    break;

                case 'getLdpeLamiQuantity':
                    $kelompok1 = '';
                    $kelompok = 'LDPE Lami';
                    break;

                case 'getLdpeQuantity':
                    $kelompok1 = '';
                    $kelompok = 'LDPE';
                    break;

                case 'getConductiveQuantity':
                    $kelompok1 = '';
                    $kelompok = 'Conductive';
                    break;

                case 'getHdpeQuantity':
                    $kelompok = 'HDPE';
                    $kelompok1 = '';
                    break;

                case 'getSweepingQuantity':
                    $kelompok = 'Sweeping';
                    $kelompok1 = '';
                    break;

                case 'getInjectionQuantity':
                    $kelompok = 'PP Injection';
                    $kelompok1 = '';
                    break;

                default:
                    $kelompok = '';
                    $kelompok1 = '';
                    break;
            }

            $qtyConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_LIST_BAHAN_KONV @kode = ?,
                @tgl = ?,
                @shift = ?,
                @nama = ?,
                @benang = ?,
                @kelompok = ?,
                @kelompok1 = ?,
                @type = ?',
                    [
                        3,
                        $tgl,
                        $shift,
                        $nama,
                        $benang,
                        $kelompok,
                        $kelompok1,
                        $type
                    ]
                );

            $qtyArr = [];
            foreach ($qtyConn as $listQuantity) {
                $qtyArr[] = [
                    'Quantity' => $listQuantity->JumlahTritier,
                    'Prosentase' => $listQuantity->Persentase,
                    'StatusType' => $listQuantity->StatusType,
                    'NamaKelompok' => $listQuantity->NamaKelompok
                ];
            }
            return response()->json($qtyArr);
        }

        // ambil data id transaksi
        else if ($id == 'getIdTransaksi') {

            $idTransaksiConn = DB::connection('ConnExtruder')
                ->select('exec SP_5298_QC_INSERT_MASTERQC @kode = ?', [1]);

            $idTransaksiArr = [];
            foreach ($idTransaksiConn as $listIdTransaksi) {
                $idTransaksiArr[] = [
                    'sNomer' => $listIdTransaksi->sNomer,
                ];
            }
            return response()->json($idTransaksiArr);
        }


    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        if ($id == 'insertDataGeneral') {
            $jam = $request->input('jam');
            $tgl = $request->input('tgl');
            $shift = $request->input('shift');
            $mesin = $request->input('mesin');
            $awal = $request->input('awal');
            $akhir = $request->input('akhir');
            $benang = $request->input('benang');
            $denierrata = $request->input('denierrata');
            $user = Auth::user()->NomorUser;
            $user = trim($user);
            $ket = $request->input('ket');
            $idKonv = $request->input('idKonv');

            try {
                DB::connection('ConnExtruder')
                    ->statement('exec [SP_5298_QC_INSERT_MASTERQC] 
        @Kode = ?, 
        @jam = ?, 
        @tgl = ?, 
        @shift = ?, 
        @mesin = ?, 
        @awal = ?, 
        @akhir = ?, 
        @benang = ?, 
        @denierrata = ?, 
        @user = ?, 
        @ket = ?, 
        @idKonv = ?',
                        [
                            0,
                            $jam,
                            $tgl,
                            $shift,
                            $mesin,
                            $awal,
                            $akhir,
                            $benang,
                            $denierrata,
                            $user,
                            $ket,
                            $idKonv,
                        ]
                    );

                return response()->json(['success' => 'Data sudah diSIMPAN'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal diSIMPAN: ' . $e->getMessage()], 500);
            }
        }

        // insert data komposisi
        else if ($id == 'insertDataKomposisi') {
            $noTr = $request->input('noTr');
            $dataArray = $request->input('dataArray');

            try {
                DB::beginTransaction();
                foreach ($dataArray as $data) {
                    $idType = $data[0];
                    $jenis = $data[2];
                    $kelompok = $data[3];
                    $idKelut = $data[1];
                    $qty = ($idKelut == 'BB') ? $data[4] : $data[5];

                    DB::connection('ConnExtruder')
                        ->statement('exec [SP_5409_QC_INSERT_KOMPOSISI] 
                            @noTr = ?, 
                            @idType = ?, 
                            @qty = ?, 
                            @idKelut = ?,
                            @idKel = ?',
                            [
                                $noTr,
                                $idType,
                                $qty,
                                $jenis,
                                $kelompok
                            ]
                        );
                }

                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }

        // insert detail data (additional data)
        else if ($id == 'insertAdditionalData') {
            $noTr = $request->input('noTr');
            $dataArray = $request->input('dataArray');

            try {
                DB::beginTransaction();
                foreach ($dataArray as $data) {
                    $lebar = $data[0];
                    $denier = $data[1];
                    $strength = $data[2];
                    $elgn = $data[3];
                    $ketS = $data[4];

                    DB::connection('ConnExtruder')
                        ->statement('exec [SP_5298_QC_INSERT_DETAILQC] 
                            @noTr = ?, 
                            @lebar = ?, 
                            @denier = ?, 
                            @strength = ?,
                            @elgn = ?,
                            @ketS = ?',
                            [
                                $noTr,
                                $lebar,
                                $denier,
                                $strength,
                                $elgn,
                                $ketS
                            ]
                        );
                }

                DB::commit();
            } catch (\Exception $e) {
                DB::rollback();
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }

        // update nomor counter by id trx
        else if ($id == 'updateCounter') {
            $noTr = $request->input('noTr');

            try {
                DB::connection('ConnExtruder')
                    ->statement('exec [SP_5298_QC_UPDATE_MASTERQC] 
                        @kode = ?, 
                        @noTr = ?',
                        [
                            2,
                            $noTr,
                        ]
                    );

                return response()->json(['success' => 'Data berhasil disimpan.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Gagal menyimpan data: ' . $e->getMessage()], 500);
            }
        }


    }

    public function destroy($id, Request $request)
    {
        if ($id == 'deleteDetail') {
            $noTr = $request->input('noTr');

            try {
                DB::connection('ConnExtruder')
                    ->statement('exec [SP_5298_QC_DELETE_DETAILQC] @noTr = ?', [
                        $noTr,
                    ]);
                return response()->json(['success' => 'Data successfully deleted.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to delete data: ' . $e->getMessage()], 500);
            }
        }

        else if ($id == 'deleteBahan') {
            $noTr = $request->input('noTr');

            try {
                DB::connection('ConnExtruder')
                    ->statement('exec [SP_5298_QC_DELETE_BAHAN_BAKU] @noTr = ?', [
                        $noTr,
                    ]);
                return response()->json(['success' => 'Data successfully deleted.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to delete data: ' . $e->getMessage()], 500);
            }
        }

        else if ($id == 'deleteMaster') {
            $noTr = $request->input('noTr');

            try {
                DB::connection('ConnExtruder')
                    ->statement('exec [SP_5298_QC_DELETE_MASTERQC] @noTr = ?', [
                        $noTr,
                    ]);
                return response()->json(['success' => 'Data successfully deleted.'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Failed to delete data: ' . $e->getMessage()], 500);
            }
        }

        
    }
}
