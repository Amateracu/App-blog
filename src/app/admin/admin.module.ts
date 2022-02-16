import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { LoginPageComponent } from "./login-page/login-page.component";
import { AdminLayoutComponent } from "./shared/components/admin-layout/admin-layout.component";
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "./shared/services/auth.guard";
import { SearchPipe } from "./shared/pipes/search.pipe";
import { AdminRoutingModule } from "./admin-routing.module";


@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    LoginPageComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminRoutingModule,
  ],
  exports: [],
  providers: [AuthGuard]
})

export class AdminModule {

}
