<?php

namespace App\Http\Controllers\Laporan;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;
use Log;

class LaporanSaldoController extends Controller
{
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('LaporanSaldo'); //tidak perlu menu di navbar
        return view('Laporan.LaporanSaldo', compact('access'));
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
        set_time_limit(300);

        if ($id === 'getDivisi') {
            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);

            $divisiConn = DB::connection('ConnInventory')
                ->select('exec SP_1003_INV_UserDivisi @XKdUser = ?', [$UserInput]);
            $divisiArr = [];
            foreach ($divisiConn as $divisiList) {
                $divisiArr[] = [
                    'NamaDivisi' => $divisiList->NamaDivisi,
                    'IdDivisi' => $divisiList->IdDivisi,
                ];
            }
            return datatables($divisiArr)->make(true);
        }

        // objek
        else if ($id === 'getObjek') {
            $UserInput = Auth::user()->NomorUser;
            $UserInput = trim($UserInput);
            $divisi = $request->input('divisi');

            $objekConn = DB::connection('ConnInventory')
                ->select('exec SP_1003_INV_User_Objek @XKdUser = ?, @XIdDivisi = ?', [$UserInput, $divisi]);
            $objekArr = [];
            foreach ($objekConn as $objekList) {
                $objekArr[] = [
                    'NamaObjek' => $objekList->NamaObjek,
                    'Objek' => $objekList->IdObjek,
                ];
            }
            return datatables($objekArr)->make(true);
        }

        // pakai sp
        // else if ($id === 'prosesLaporanACC') {
        //     $idObjek = $request->input('idObjek');
        //     $tanggal1 = $request->input('tanggal1');
        //     $tanggal2 = $request->input('tanggal2');
        //     Log::info((string)$idObjek . $tanggal1 . $tanggal2);
        //     try {
        //         $result = DB::connection('ConnInventory')->statement('EXEC Sp_Lap_ACC @tanggal1 = ?, @tanggal2 = ?, @IdObjek = ?', [$tanggal1, $tanggal2, $idObjek]);
        //         Log::info($result);
        //         return response()->json(['success' => 'Excel sudah bisa didownload'], 200);
        //     } catch (\Exception $e) {
        //         return response()->json(['error' => 'Data gagal dijadikan Excel: ' . $e->getMessage()], 500);
        //     }
        // }

        //  else if ($id === 'prosesLaporanACC') {
        //     $idObjek = $request->input('idObjek');
        //     $tanggal1 = $request->input('tanggal1');
        //     $tanggal2 = $request->input('tanggal2');
        //     $sw = 0;

        //     if ($tanggal1 >= '1/1/2009') { //belom jalan
        //         try {
        //             DB::transaction(function () use ($tanggal1, $tanggal2, $idObjek, $sw) {
        //                 DB::connection('ConnInventory')->table('LAP_ACC')->delete();

        //                 if ($sw === 0) {
        //                     $sw = 1;

        //                     DB::connection('ConnInventory')->
        //                         table('Lap_Acc')->insert([
        //                                 'kelompokUtama' => '** Laporan Stok Tanggal: ' . $tanggal1 . ' s/d ' . $tanggal2
        //                             ]);
        //                 }

        //                 $validIdObjeks = ['030', '228', '282'];

        //                 if (in_array($idObjek, $validIdObjeks)) {
        //                     $results = DB::connection('ConnInventory')->table('VW_TYPE_WAREHOUSE_ALL')
        //                         ->select('NamaDivisi', 'NamaObjek', 'NamaKelompokUtama', 'NamaKelompok', 'NamaSubKelompok', 'Namatype', 'KodeBarang', 'Idtype')
        //                         ->where('idobjek', $idObjek)
        //                         ->where('namakelompokutama', '<>', DB::raw("COALESCE('Lain - Lain', 'Lain - Lain')"))
        //                         ->whereNotLike('KodeBarang', '00%')
        //                         ->orderBy('NamaKelompokUtama')
        //                         ->orderBy('NamaKelompok')
        //                         ->orderBy('NamaSubKelompok')
        //                         ->orderBy('Namatype')
        //                         ->get();
        //                 } else {
        //                     $results = DB::connection('ConnInventory')->table(DB::raw('(
        //                         SELECT TOP 100 PERCENT
        //                             dbo.Type.IdType,
        //                             dbo.Type.NamaType,
        //                             dbo.Type.KodeBarang,
        //                             SATUAN_3.nama_satuan,
        //                             dbo.Subkelompok.NamaSubKelompok,
        //                             dbo.Kelompok.NamaKelompok,
        //                             dbo.KelompokUtama.NamaKelompokUtama,
        //                             dbo.Objek.NamaObjek,
        //                             dbo.Divisi.NamaDivisi,
        //                             dbo.Divisi.IdDivisi,
        //                             dbo.Type.MinimumStock,
        //                             dbo.Type.SaldoPrimer,
        //                             dbo.Type.SaldoSekunder,
        //                             dbo.Type.SaldoTritier,
        //                             dbo.Objek.IdObjek,
        //                             dbo.KelompokUtama.IdKelompokUtama,
        //                             dbo.Kelompok.IdKelompok,
        //                             dbo.Subkelompok.IdSubkelompok,
        //                             Satuan_1.nama_satuan AS [satPrimer],
        //                             Satuan_2.nama_satuan AS [satSekunder],
        //                             dbo.Type.UnitPrimer,
        //                             dbo.Type.UnitSekunder,
        //                             dbo.Type.UnitTritier,
        //                             dbo.Type.Nonaktif,
        //                             dbo.Type.MaximumStock
        //                         FROM dbo.SATUAN Satuan_1
        //                             RIGHT OUTER JOIN dbo.Type
        //                                 INNER JOIN dbo.SATUAN SATUAN_3
        //                                     ON dbo.Type.UnitTritier = SATUAN_3.no_satuan
        //                                 ON Satuan_1.no_satuan = dbo.Type.UnitPrimer
        //                             LEFT OUTER JOIN dbo.SATUAN Satuan_2
        //                                 ON dbo.Type.UnitSekunder = Satuan_2.no_satuan
        //                             LEFT OUTER JOIN dbo.Objek
        //                                 LEFT OUTER JOIN dbo.Divisi
        //                                     ON dbo.Objek.IdDivisi_Objek = dbo.Divisi.IdDivisi
        //                                 RIGHT OUTER JOIN dbo.KelompokUtama
        //                                     ON dbo.Objek.IdObjek = dbo.KelompokUtama.IdObjek_KelompokUtama
        //                                 RIGHT OUTER JOIN dbo.Kelompok
        //                                     ON dbo.KelompokUtama.IdKelompokUtama = dbo.Kelompok.IdKelompokUtama_Kelompok
        //                                 RIGHT OUTER JOIN dbo.Subkelompok
        //                                     ON dbo.Kelompok.IdKelompok = dbo.Subkelompok.IdKelompok_Subkelompok
        //                             ON dbo.Type.IdSubkelompok_Type = dbo.Subkelompok.IdSubkelompok
        //                         ORDER BY dbo.Type.IdType
        //                     ) AS VW_TYPE_WAREHOUSE_ALL'))
        //                         ->select('VW_TYPE_WAREHOUSE_ALL.NamaDivisi', 'VW_TYPE_WAREHOUSE_ALL.NamaObjek', 'VW_TYPE_WAREHOUSE_ALL.NamaKelompokUtama', 'VW_TYPE_WAREHOUSE_ALL.NamaKelompok', 'VW_TYPE_WAREHOUSE_ALL.NamaSubKelompok', 'VW_TYPE_WAREHOUSE_ALL.Namatype', 'VW_TYPE_WAREHOUSE_ALL.KodeBarang', 'VW_TYPE_WAREHOUSE_ALL.Idtype')
        //                         ->where('VW_TYPE_WAREHOUSE_ALL.idobjek', DB::raw("COALESCE('{$idObjek}', '{$idObjek}')"))
        //                         ->orderBy('VW_TYPE_WAREHOUSE_ALL.NamaKelompokUtama')
        //                         ->orderBy('VW_TYPE_WAREHOUSE_ALL.NamaKelompok')
        //                         ->orderBy('VW_TYPE_WAREHOUSE_ALL.NamaSubKelompok')
        //                         ->orderBy('VW_TYPE_WAREHOUSE_ALL.Namatype')
        //                         ->get();
        //                 }

        //                 dd($results);

        //                 foreach ($results as $result) {
        //                     $NmDivisi = $result->NamaDivisi;
        //                     $NmObjek = $result->NamaObjek;
        //                     $NmKelut = $result->NamaKelompokUtama;
        //                     $NmKel = $result->NamaKelompok;
        //                     $NmSubKel = $result->NamaSubKelompok;
        //                     $NamaType = $result->Namatype;
        //                     $KodeBarang = $result->KodeBarang;
        //                     $Idtype = $result->Idtype;

        //                     $AwalPrimer = $AwalSekunder = $AwalTritier = null;
        //                     $MasukPrimer = $MasukSekunder = $MasukTritier = 0;
        //                     $KeluarPrimer = $KeluarSekunder = $KeluarTritier = 0;
        //                     $AkhirPrimer = $AkhirSekunder = $AkhirTritier = 0;

        //                     $maxIdTrans = DB::connection('ConnInventory')
        //                         ->table('VW_PRG_TRANSAKSI_BARU as a')
        //                         ->select(DB::raw('MAX(IdTransaksi) as MaxIdTrans'))
        //                         ->whereExists(function ($query) use ($tanggal1, $Idtype) {
        //                             $query->select('IdType')
        //                                 ->from('VW_PRG_TRANSAKSI_BARU')
        //                                 ->whereColumn('a.Saatlog', '<=', DB::raw("DATEADD(day, -1, '{$tanggal1}')"))
        //                                 ->where('a.IdType', $Idtype);
        //                         })
        //                         ->groupBy('a.IdType')
        //                         ->first();

        //                     if ($maxIdTrans) {
        //                         $maxIdTransValue = $maxIdTrans->MaxIdTrans;

        //                         $awalSaldo = DB::connection('ConnInventory')
        //                             ->table('VW_PRG_TRANSAKSI_BARU')
        //                             ->select('SaldoPrimer', 'SaldoSekunder', 'SaldoTritier')
        //                             ->where('IdTransaksi', $maxIdTransValue)
        //                             ->first();

        //                         $AwalPrimer = $awalSaldo->SaldoPrimer;
        //                         $AwalSekunder = $awalSaldo->SaldoSekunder;
        //                         $AwalTritier = $awalSaldo->SaldoTritier;
        //                     }

        //                     $AwalPrimer = $AwalPrimer ?? 0;
        //                     $AwalSekunder = $AwalSekunder ?? 0;
        //                     $AwalTritier = $AwalTritier ?? 0;

        //                     $cariMasukKeluar = DB::connection('ConnInventory')
        //                         ->table('VW_PRG_TRANSAKSI_BARU as a')
        //                         ->select(
        //                             DB::raw('SUM(jumlahpemasukanPrimer) as MasukPrimer'),
        //                             DB::raw('SUM(jumlahpemasukanSekunder) as MasukSekunder'),
        //                             DB::raw('SUM(jumlahpemasukanTritier) as MasukTritier'),
        //                             DB::raw('SUM(jumlahpengeluaranPrimer) as KeluarPrimer'),
        //                             DB::raw('SUM(jumlahpengeluaranSekunder) as KeluarSekunder'),
        //                             DB::raw('SUM(jumlahpengeluaranTritier) as KeluarTritier')
        //                         )
        //                         ->whereExists(function ($query) use ($tanggal1, $tanggal2, $Idtype) {
        //                             $query->select('IdType')
        //                                 ->from('VW_PRG_TRANSAKSI_BARU')
        //                                 ->whereBetween('a.Saatlog', [$tanggal1, $tanggal2])
        //                                 ->where('a.IdType', $Idtype);
        //                         })
        //                         ->groupBy('a.IdType')
        //                         ->first();

        //                     if ($cariMasukKeluar) {
        //                         $MasukPrimer = $cariMasukKeluar->MasukPrimer ?? 0;
        //                         $MasukSekunder = $cariMasukKeluar->MasukSekunder ?? 0;
        //                         $MasukTritier = $cariMasukKeluar->MasukTritier ?? 0;
        //                         $KeluarPrimer = $cariMasukKeluar->KeluarPrimer ?? 0;
        //                         $KeluarSekunder = $cariMasukKeluar->KeluarSekunder ?? 0;
        //                         $KeluarTritier = $cariMasukKeluar->KeluarTritier ?? 0;
        //                     }
        //                     // if ($Idtype == '00000000000000005093') {
        //                     //     dd($awalSaldo);
        //                     // }
        //                     $MasukPrimer = $MasukPrimer ?? 0;
        //                     $MasukSekunder = $MasukSekunder ?? 0;
        //                     $MasukTritier = $MasukTritier ?? 0;
        //                     $KeluarPrimer = $KeluarPrimer ?? 0;
        //                     $KeluarSekunder = $KeluarSekunder ?? 0;
        //                     $KeluarTritier = $KeluarTritier ?? 0;
        //                     // Saldo Akhir
        //                     $AkhirPrimer = $AwalPrimer + $MasukPrimer - $KeluarPrimer;
        //                     $AkhirSekunder = $AwalSekunder + $MasukSekunder - $KeluarSekunder;
        //                     $AkhirTritier = $AwalTritier + $MasukTritier - $KeluarTritier;
        //                 }
        //                 Log::info($Idtype);
        //                 // Insert into Lap_Acc if conditions are met
        //                 if (
        //                     !($AwalPrimer == 0 && $AwalSekunder == 0 && $AwalTritier == 0 &&
        //                         $MasukPrimer == 0 && $MasukSekunder == 0 && $MasukTritier == 0 &&
        //                         $KeluarPrimer == 0 && $KeluarSekunder == 0 && $KeluarTritier == 0)
        //                 ) {
        //                     $insertData = DB::connection('ConnInventory')->table('Lap_Acc')->insert([
        //                         'Divisi' => $NmDivisi,
        //                         'Objek' => $NmObjek,
        //                         'KelompokUtama' => $NmKelut,
        //                         'Kelompok' => $NmKel,
        //                         'SubKelompok' => $NmSubKel,
        //                         'Type' => $NamaType,
        //                         'KodeBarang' => $KodeBarang,
        //                         'SaldoAwalPrimer' => $AwalPrimer,
        //                         'SaldoAwalSekunder' => $AwalSekunder,
        //                         'SaldoAwalTritier' => $AwalTritier,
        //                         'PemasukanPrimer' => $MasukPrimer,
        //                         'PemasukanSekunder' => $MasukSekunder,
        //                         'PemasukanTritier' => $MasukTritier,
        //                         'PengeluaranPrimer' => $KeluarPrimer,
        //                         'PengeluaranSekunder' => $KeluarSekunder,
        //                         'PengeluaranTritier' => $KeluarTritier,
        //                         'SaldoAkhirPrimer' => $AkhirPrimer,
        //                         'SaldoAkhirSekunder' => $AkhirSekunder,
        //                         'SaldoAkhirTritier' => $AkhirTritier,
        //                     ]);

        //                     Log::info((string)'Data masuk: ID Type: '. $Idtype . ' | Awal Primer: '. $AwalPrimer . ' | Status Insert Data: ' . $insertData);
        //                 }

        //             });

        //             return response()->json(['success' => 'Excel sudah bisa didownload'], 200);
        //         } catch (\Exception $e) {
        //             return response()->json(['error' => 'Data gagal dijadikan Excel: ' . $e->getMessage()], 500);
        //         }
        //     }
        // }

        else if ($id === 'prosesLaporanACC') {
            $idObjek = $request->input('idObjek');
            $tanggal1 = $request->input('tanggal1');
            $tanggal2 = $request->input('tanggal2');
            $sw = 0;

            try {
                DB::transaction(function () use ($tanggal1, $tanggal2, $idObjek, $sw) {
                    // delete table
                    DB::connection('ConnInventory')->statement(
                        'exec [SP_LAPORAN_SALDO_COBA] @kode = 1, @IdObjek = ?, @tanggal1 = ?, @tanggal2 = ?',
                        [$idObjek, $tanggal1, $tanggal2]
                    );

                    // insert ke Lap_Acc
                    if ($sw === 0) {
                        DB::connection('ConnInventory')->statement(
                            'exec [SP_LAPORAN_SALDO_COBA] @kode = 2, @IdObjek = ?, @tanggal1 = ?, @tanggal2 = ?',
                            [$idObjek, $tanggal1, $tanggal2]
                        );
                    }

                    // select data tergantung IdObjek
                    $results = DB::connection('ConnInventory')->select(
                        'exec [SP_LAPORAN_SALDO_COBA] @kode = 3, @IdObjek = ?, @tanggal1 = ?, @tanggal2 = ?',
                        [$idObjek, $tanggal1, $tanggal2]
                    );

                    // dd($results);
                    $arrAll = [];
                    $arrID = [];

                    foreach ($results as $result) {
                        $Divisi = $result->NamaDivisi;
                        $Objek = $result->NamaObjek;
                        $KelompokUtama = $result->NamaKelompokUtama;
                        $Kelompok = $result->NamaKelompok;
                        $SubKelompok = $result->NamaSubKelompok;
                        $type = $result->Namatype;
                        $KodeBarang = $result->KodeBarang;
                        $Idtype = $result->Idtype;

                        array_push($arrID, $Idtype);
                        $arrAll[] = [
                            'Divisi' => $Divisi,
                            'Objek' => $Objek,
                            'KelompokUtama' => $KelompokUtama,
                            'Kelompok' => $Kelompok,
                            'SubKelompok' => $SubKelompok,
                            'Type' => $type,
                            'KodeBarang' => $KodeBarang,
                            'Idtype' => $Idtype,
                        ];
                        // dd($proses);
                    }

                    $idChunks = array_chunk($arrID, 100);

                    foreach ($idChunks as $chunk) {
                        $ids = implode(',', $chunk);

                        $prosesSaldo = DB::connection('ConnInventory')->select(
                            'exec [SP_LAP_SALDO_EXECUTE]
                            @kode = 1, @IdObjek = ?, @tanggal1 = ?, @tanggal2 = ?, @IdType = ?',
                            [$idObjek, $tanggal1, $tanggal2, $ids]
                        );

                        // dd($prosesSaldo);

                        // get idtype dari $prosesSaldo
                        $idTypeFilterSaldo1 = [];
                        foreach ($prosesSaldo as $row) {
                            $idTypeFilterSaldo1[] = $row->IdType;
                        }
                        // get awal dari $prosesSaldo
                        $dataUangMap = [];
                        $dataid = [];
                        foreach ($prosesSaldo as $row) {
                            $dataUangMap[$row->IdType] = [
                                'AwalPrimer' => $row->SaldoPrimer,
                                'AwalSekunder' => $row->SaldoSekunder,
                                'AwalTritier' => $row->saldoTritier,
                            ];
                            $dataid[] = $row->IdType;
                        }

                        // set nilai kalau null pd awalan
                        $allArrayWithSaldo = [];
                        foreach ($arrAll as $data) {
                            if (in_array($data['Idtype'], $idTypeFilterSaldo1)) {
                                $IdType = $data['Idtype'];
                                $saldoData = isset($dataUangMap[$IdType]) ? $dataUangMap[$IdType] : [
                                    'AwalPrimer' => ".00",
                                    'AwalSekunder' => ".00",
                                    'AwalTritier' => ".00"
                                ];

                                $allArrayWithSaldo[] = array_merge($data, $saldoData);
                            }
                        }
                        // dd($allArrayWithSaldo);



                        // dd($allArrayWithSaldoUpdated);

                        // array untuk primer, seknder, tritier
                        // $dataid = [];
                        // foreach ($prosesSaldo as $row) {
                        //     $dataid[] = $row->IdType;
                        // }

                        $ids2 = implode(',', $dataid);

                        $saldoKeluarMasuk = DB::connection('ConnInventory')->select(
                            'exec [SP_LAP_SALDO_EXECUTE]
                            @kode = 2, @IdObjek = ?, @tanggal1 = ?, @tanggal2 = ?, @IdType = ?',
                            [$idObjek, $tanggal1, $tanggal2, $ids2]
                        );

                        // dd($saldoKeluarMasuk);

                        $dataSaldoMap = [];
                        foreach ($saldoKeluarMasuk as $row) {
                            $dataSaldoMap[$row->idtype] = [
                                'MasukPrimer' => $row->MasukPrimer,
                                'MasukSekunder' => $row->MasukSekunder,
                                'MasukTritier' => $row->MasukTritier,
                                'KeluarPrimer' => $row->KeluarPrimer,
                                'KeluarSekunder' => $row->KeluarSekunder,
                                'KeluarTritier' => $row->KeluarTritier
                            ];
                        }

                        $allArrayFinal = [];
                        foreach ($allArrayWithSaldo as $data) {
                            $Idtype = $data['Idtype'];

                            // Default saldo values if Idtype is not found in $dataSaldoMap
                            $defaultSaldoData = [
                                'MasukPrimer' => "0.00",
                                'MasukSekunder' => "0.00",
                                'MasukTritier' => "0.00",
                                'KeluarPrimer' => "0.00",
                                'KeluarSekunder' => "0.00",
                                'KeluarTritier' => "0.00"
                            ];

                            // Merge the default saldo data with the data from $dataSaldoMap if available
                            $saldoData = isset($dataSaldoMap[$Idtype]) ? $dataSaldoMap[$Idtype] : $defaultSaldoData;

                            $allArrayFinal[] = array_merge($data, $saldoData);
                        }

                        // dd($allArrayWithSaldo);

                        $allArrayFinal = [];
                        foreach ($allArrayWithSaldo as $data) {
                            $IdType = $data['Idtype'];

                            // Default saldo values if IdType is not found in $dataSaldoMap
                            $defaultSaldoData = [
                                'MasukPrimer' => "0.00",
                                'MasukSekunder' => "0.00",
                                'MasukTritier' => "0.00",
                                'KeluarPrimer' => "0.00",
                                'KeluarSekunder' => "0.00",
                                'KeluarTritier' => "0.00"
                            ];

                            // Merge the default saldo data with the data from $dataSaldoMap if available
                            $saldoData = isset($dataSaldoMap[$IdType]) ? $dataSaldoMap[$IdType] : $defaultSaldoData;

                            $allArrayFinal[] = array_merge($data, $saldoData);
                        }

                        // dd($allArrayFinal);

                        $allArrayFinalWithSaldo = [];
                        foreach ($allArrayFinal as $data) {
                            $IdType = $data['Idtype'];

                            // Initialize variables for Awal, Masuk, and Keluar values
                            $AwalPrimer = isset($data['AwalPrimer']) ? (float) $data['AwalPrimer'] : 0.00;
                            $AwalSekunder = isset($data['AwalSekunder']) ? (float) $data['AwalSekunder'] : 0.00;
                            $AwalTritier = isset($data['AwalTritier']) ? (float) $data['AwalTritier'] : 0.00;

                            $MasukPrimer = isset($data['MasukPrimer']) ? (float) $data['MasukPrimer'] : 0.00;
                            $MasukSekunder = isset($data['MasukSekunder']) ? (float) $data['MasukSekunder'] : 0.00;
                            $MasukTritier = isset($data['MasukTritier']) ? (float) $data['MasukTritier'] : 0.00;

                            $KeluarPrimer = isset($data['KeluarPrimer']) ? (float) $data['KeluarPrimer'] : 0.00;
                            $KeluarSekunder = isset($data['KeluarSekunder']) ? (float) $data['KeluarSekunder'] : 0.00;
                            $KeluarTritier = isset($data['KeluarTritier']) ? (float) $data['KeluarTritier'] : 0.00;

                            // Calculate Saldo Akhir
                            $SaldoAkhirPrimer = $AwalPrimer + $MasukPrimer - $KeluarPrimer;
                            $SaldoAkhirSekunder = $AwalSekunder + $MasukSekunder - $KeluarSekunder;
                            $SaldoAkhirTritier = $AwalTritier + $MasukTritier - $KeluarTritier;

                            // Add the new SaldoAkhir values to the data array
                            $data['SaldoAkhirPrimer'] = number_format($SaldoAkhirPrimer, 2, '.', '');
                            $data['SaldoAkhirSekunder'] = number_format($SaldoAkhirSekunder, 2, '.', '');
                            $data['SaldoAkhirTritier'] = number_format($SaldoAkhirTritier, 2, '.', '');

                            // Add this data to the final array
                            $allArrayFinalWithSaldo[] = $data;
                        }

                        // dd($allArrayFinalWithSaldo);


                        foreach ($allArrayFinalWithSaldo as $data) {
                            if (
                                !(
                                    $data['AwalPrimer'] == 0 &&
                                    $data['AwalSekunder'] == 0 &&
                                    $data['AwalTritier'] == 0 &&
                                    $data['MasukPrimer'] == 0 &&
                                    $data['MasukSekunder'] == 0 &&
                                    $data['MasukTritier'] == 0 &&
                                    $data['KeluarPrimer'] == 0 &&
                                    $data['KeluarSekunder'] == 0 &&
                                    $data['KeluarTritier'] == 0
                                )
                            ) {
                                DB::connection('ConnInventory')->table('Lap_Acc')->insert([
                                    'Divisi' => $data['NmDivisi'],
                                    'Objek' => $data['NmObjek'],
                                    'KelompokUtama' => $data['NmKelut'],
                                    'Kelompok' => $data['NmKel'],
                                    'SubKelompok' => $data['NmSubKel'],
                                    'Type' => $data['NamaType'],
                                    'KodeBarang' => $data['KodeBarang'],
                                    'SaldoAwalPrimer' => $data['AwalPrimer'],
                                    'SaldoAwalSekunder' => $data['AwalSekunder'],
                                    'SaldoAwalTritier' => $data['AwalTritier'],
                                    'PemasukanPrimer' => $data['MasukPrimer'],
                                    'PemasukanSekunder' => $data['MasukSekunder'],
                                    'PemasukanTritier' => $data['MasukTritier'],
                                    'PengeluaranPrimer' => $data['KeluarPrimer'],
                                    'PengeluaranSekunder' => $data['KeluarSekunder'],
                                    'PengeluaranTritier' => $data['KeluarTritier'],
                                    'SaldoAkhirPrimer' => $data['SaldoAkhirPrimer'],
                                    'SaldoAkhirSekunder' => $data['SaldoAkhirSekunder'],
                                    'SaldoAkhirTritier' => $data['SaldoAkhirTritier'],
                                ]);
                            }
                        }
                    }
                });

                return response()->json(['success' => 'Excel sudah bisa didownload'], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Data gagal dijadikan Excel: ' . $e->getMessage()], 500);
            }
        }
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
