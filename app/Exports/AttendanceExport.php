<?php

namespace App\Exports;

use App\Models\Attendance;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class AttendanceExport implements FromCollection, WithHeadings, WithMapping, WithColumnWidths, WithEvents, WithTitle
{
    protected $taskQueues;
    protected $timezone;
    protected $contact_level;

    public function __construct($taskQueues, $timezone = null, $contact_level = null)
    {
        // dd($taskQueues);
        $this->taskQueues = $taskQueues;
        $this->timezone = $timezone;
        $this->contact_level = $contact_level;
    }

    public function columnWidths(): array
    {
        return [
            'A' => 5,
            'B' => 15,
            'C' => 15,
            'D' => 25,
            'E' => 10,
            'F' => 10,
            'G' => 20,
            'H' => 20,
            'I' => 20,
            'J' => 20,
            'K' => 20,
            'L' => 20,
            'M' => 20,
            'N' => 20,
            'O' => 20,
            'P' => 20,
            'Q' => 20,
            'S' => 20,
            'T' => 20,
            'U' => 20,
            'V' => 20,
            'W' => 20,
            'X' => 20,
            'Y' => 20,
            'Z' => 20,
            'AA' => 20,
            'AB' => 20,
            'AC' => 20,
        ];
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $event->sheet
                    ->getStyle('A1:AC1')
                    ->applyFromArray([
                        'font' => ['bold' => true, 'size' => '12'],
                    ])
                    ->getAlignment()
                    ->setHorizontal(Alignment::HORIZONTAL_CENTER)
                    ->setVertical(Alignment::VERTICAL_CENTER);
                //$event->sheet->setAutoFilter('A1:K1');
                $event->sheet->getDelegate()->freezePane('A2');
            },
        ];
    }

    public function headings(): array
    {
        $headings = ['Sr no', 'Name', 'Phone', 'Email', 'Date', 'Attendance'];

        return $headings;
    }

    public function map($taskQueuey): array
    {
        $row = [
            $taskQueuey->id ?? '',
            $taskQueuey->name ?? '',
            $taskQueuey->phone ?? '',
            $taskQueuey->email ?? '',
            $taskQueuey->date ?? '',
            $taskQueuey->attendance == 1 ? 'Present' : 'Absent',
        ];
        return $row;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return collect($this->taskQueues);
    }

    public function title(): string
    {
        return 'Task Queue Report';
    }
}
