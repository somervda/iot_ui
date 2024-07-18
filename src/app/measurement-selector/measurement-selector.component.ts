import { Component ,Input} from '@angular/core';

@Component({
  selector: 'app-measurement-selector',
  standalone: true,
  imports: [],
  templateUrl: './measurement-selector.component.html',
  styleUrl: './measurement-selector.component.scss'
})
export class MeasurementSelectorComponent {
  // Measurement selector behaviour changes depending on if is being
  // used to select measurements for charting vs measurements for grids/data extracts
  @Input() forChart = true;

}
