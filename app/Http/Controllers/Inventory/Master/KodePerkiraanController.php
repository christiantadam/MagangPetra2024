<?php

namespace App\Http\Controllers\Inventory\Master;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\HakAksesController;

class KodePerkiraanController extends Controller
{
    //Display a listing of the resource.
    public function index()
    {
        $access = (new HakAksesController)->HakAksesFiturMaster('Inventory'); //tidak perlu menu di navbar
        return view('Inventory.Master.KodePerkiraan', compact('access'));
    }

    //Show the form for creating a new resource.
    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id, Request $request)
    {   $a = (int)$request->input('a');
        $kode = $request->input('kode');
        $keterangan = $request->input('keterangan');

        if ($id === 'getPerkiraan') {
            if ($a === 1) {
                // cek kode perkiraan
                $cekKodePerkiraan = DB::connection('ConnInventory')->select('exec SP_1003_INV_CheckNo_Perkiraan @XNoKodePerkiraan = ?', [$kode]);
                if ($cekKodePerkiraan && $cekKodePerkiraan[0]->Jumlah === "0") {
                    // insert
                    DB::connection('ConnInventory')->statement(
                        'exec SP_1003_INV_insert_perkiraan @XNoKodePerkiraan = ? , @XKeterangan = ?',
                        [$kode, $keterangan]
                    );
                    return response()->json(['success' => 'Data Berhasil Disimpan'], 200);
                }
                return response()->json(['error' => 'Kode Perkiraan already exists'], 400);

            } else if ($a === 2) {
                // Update
                DB::connection('ConnInventory')->statement(
                    'exec SP_1003_INV_update_perkiraan @XNoKodePerkiraan = ? , @XKeterangan = ?',
                    [$kode, $keterangan]
                );
                return response()->json(['success' => 'Data Berhasil Dikoreksi'], 200);

            } else if ($a === 3) {
                // Delete
                DB::connection('ConnInventory')->statement(
                    'exec SP_1003_INV_delete_perkiraan @XNoKodePerkiraan = ?', [$kode]
                );
                return response()->json(['success' => 'Data Berhasil Dihapus'], 200);
            }

            // daftar kode perkiraan
        } else if ($id === 'getAllKodePerkiraan') {
            $dataPerkiraan = DB::connection('ConnInventory')->select('exec SP_1003_INV_list_perkiraan');
            $data_perkiraan = [];
            foreach ($dataPerkiraan as $detail_kodeperkiraan) {
                $data_perkiraan[] = [
                    'NoKodePerkiraan' => $detail_kodeperkiraan->NoKodePerkiraan,
                    'Keterangan' => $detail_kodeperkiraan->Keterangan
                ];
            }
            // dd($dataPerkiraan);
            return datatables($dataPerkiraan)->make(true);
        }
    }

    // Show the form for editing the specified resource.
    public function edit($id)
    {
        //
    }

    //Update the specified resource in storage.
    public function update(Request $request, $id)
    {
        //
    }

    //Remove the specified resource from storage.
    public function destroy(Request $request)
    {
        $data = $request->all();
        // dd('Masuk Destroy', $data);
        DB::connection('ConnInventory')->statement('exec SP_5409_PAY_MAINT_KELUARGA @XNoKodePerkiraan = ?', [
            $data['Kode'],
        ]);
        return redirect()->route('KodePerkiraan.index')->with('alert', 'Data berhasil dihapus!');
    }
}
