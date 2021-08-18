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
    SelectInputComponent,
    InputVariablesPipe,
    OutputVariablesPipe,
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
  ],
  exports: [
  ],
})
export class MainModule { }
