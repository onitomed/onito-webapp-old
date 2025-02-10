import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import {ClipboardModule} from '@angular/cdk/clipboard';





import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderItemComponent } from './components/header-item/header-item.component';
import { ContainerComponent } from './components/container/container.component';
import { ButtonComponent } from './components/button/button.component';
import { PredictComponent } from './pages/predict/predict.component';
import { AddReportsComponent } from './pages/add-reports/add-reports.component';
import { ModelsComponent } from './pages/models/models.component';
import { PredictItemComponent } from './components/predict-item/predict-item.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginComponent } from './components/login/login.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewComponent } from './pages/view/view.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


const appRoutes: Routes = [
  {path: 'home', component: ContainerComponent},
  {path: 'predict', component: PredictComponent},
  {path: 'add-reports', component: AddReportsComponent},
  {path: 'models', component: ModelsComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: LoginComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'view', component: ViewComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderItemComponent,
    ContainerComponent,
    ButtonComponent,
    PredictComponent,
    AddReportsComponent,
    ModelsComponent,
    PredictItemComponent,
    FileUploadComponent,
    RegisterComponent,
    UserProfileComponent,
    LoginComponent,
    ReportsComponent,
    ViewComponent,

  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes, { enableTracing: true }), HttpClientModule, FormsModule, PdfViewerModule, ClipboardModule, NoopAnimationsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
