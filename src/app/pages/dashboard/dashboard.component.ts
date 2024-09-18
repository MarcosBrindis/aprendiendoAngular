import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { MainSectionComponent } from '../../components/main-section/main-section.component';
import { FooterComponent } from '../../components/footer/footer.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent,MenuComponent,MainSectionComponent,FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
