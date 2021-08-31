import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MainComponent } from './component/main.component';
import { MainRoutingModule } from './main-routing.module';
import { WorkflowBuilderComponent } from 'src/app/pages/workflow-builder/workflow-builder.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CdkTreeModule } from '@angular/cdk/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlowComponent } from 'src/app/components/flow/flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxdModule } from '@ngxd/core';
import { DynamicInputWrapperComponent } from 'src/app/components/dynamic-input/dynamic-input-wrapper/dynamic-input-wrapper.component';
import { ArrayInputComponent } from 'src/app/components/dynamic-input/array-input/array-input.component';
import { BooleanInputComponent } from 'src/app/components/dynamic-input/boolean-input/boolean-input.component';
import { IntegerInputComponent } from 'src/app/components/dynamic-input/integer-input/integer-input.component';
import { NumberInputComponent } from 'src/app/components/dynamic-input/number-input/number-input.component';
import { TextInputComponent } from 'src/app/components/dynamic-input/text-input/text-input.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SelectInputComponent } from 'src/app/components/dynamic-input/select-input/select-input.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InputVariablesPipe } from 'src/app/pipes/input-variables.pipe';
import { OutputVariablesPipe } from 'src/app/pipes/output-variables.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TextSuggestionInputComponent } from 'src/app/components/dynamic-input/text-suggestion-input/text-suggestion-input.component';
import { AuthenticationsComponent } from 'src/app/pages/authentications/authentications.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { AddAuthenticationComponent } from '../../components/authentication/add-authentication/add-authentication.component'
import { KeyValuePipe } from 'src/app/pipes/key-value.pipe';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/components/snackbar/snackbar.component';
import { PasswordInputComponent } from 'src/app/components/dynamic-input/password-input/password-input.component';
import { YesNoDialogComponent } from 'src/app/components/yes-no-dialog/yes-no-dialog.component';
import { EditAuthenticationComponent } from 'src/app/components/authentication/edit-authentication/edit-authentication.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    WorkflowBuilderComponent,
    HeaderComponent,
    FlowComponent,
    DynamicInputWrapperComponent,
    ArrayInputComponent,
    BooleanInputComponent,
    IntegerInputComponent,
    NumberInputComponent,
    TextInputComponent,
    PasswordInputComponent,
    TextSuggestionInputComponent,
    SelectInputComponent,
    InputVariablesPipe,
    OutputVariablesPipe,
    KeyValuePipe,
    AuthenticationsComponent,
    AddAuthenticationComponent,
    EditAuthenticationComponent,
    SnackbarComponent,
    YesNoDialogComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CdkTreeModule,
    DragDropModule,
    MatFormFieldModule,
    NgxdModule,
    MatInputModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500 } },
  ],
  exports: [
  ],
})
export class MainModule { }
