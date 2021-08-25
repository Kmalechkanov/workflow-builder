import { Component, OnInit } from '@angular/core';
import { IntegrationService } from 'src/app/services/integration.service';
import { take } from 'rxjs/operators';
import { Integration } from 'src/app/models/integration/integration.model';
import { IntegrationServiceModel } from 'src/app/models/integration/integration-service.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FlowService } from 'src/app/services/flow.service';
import { Flow } from 'src/app/models/flow/flow.model';
import { IntegrationTree } from 'src/app/models/integration/integration-tree.model';

@Component({
  selector: 'app-workflow-builder',
  templateUrl: './workflow-builder.component.html',
  styleUrls: ['./workflow-builder.component.scss']
})
export class WorkflowBuilderComponent implements OnInit {
  toggleResize = false;
  data!: IntegrationTree;
  visualizedData!: IntegrationTree;
  navigation!: [string[]];

  selected: Flow[] = [];

  constructor(
    private integrationService: IntegrationService,
    private flowService: FlowService,
  ) { }

  ngOnInit(): void {
    this.navigation = [[]];
    this.data = new IntegrationTree;
    this.data.name = '';
    this.integrationService.getAll().pipe(take(1)).subscribe(
      res => {
        this.integrationsToData(res);
        this.visualizedData = this.data;
      }
    );
  }

  openFolderByPath(path: string[]): void {
    var tempData = this.data;
    this.navigation = [[]];
    for (var route of path) {
      tempData = tempData.folders!.find(f => f.name == route)!;
      let tempNav = Object.assign([], this.navigation[this.navigation.length - 1]);
      tempNav.push(route);
      this.navigation.push(tempNav);
    }
    this.visualizedData = tempData;
  }

  openFolder(name: string): void {
    let tempNav = Object.assign([], this.navigation[this.navigation.length - 1]);
    tempNav.push(name);
    this.navigation.push(tempNav);

    this.visualizedData = this.visualizedData.folders!.find(f => f.name == name)!;
  }

  drop(event: CdkDragDrop<Flow[]>): void {
    if (event.previousContainer != event.container) {

      this.flowService.get(event.item.data.id).pipe(take(1)).subscribe(
        res => {
          this.selected.push(res);
        }
      );
    }
  }

  noReturnPredicate(): boolean {
    return false;
  }

  hasChild(_: number, node: IntegrationTree): boolean {
    return !!node.folders && node.folders.length > 0 || !!node.services && node.services.length > 0;
  }

  private integrationsToData(integrations: Integration[]): void {
    integrations.forEach(integration => {
      this.addToTr(this.data, integration.path.slice(1), integration)
    });
  }

  private addToTr(obj: IntegrationTree, pathInput: string, data: Integration): void {
    const path = pathInput.split('/');
    for (var i = 0; i < path.length - 1; i++) {

      if (!obj.folders) {
        obj.folders = [];
      }
      if (!obj.folders!.some(x => x.name == path[i])) {
        let tempIntegrationTreee = new IntegrationTree();
        tempIntegrationTreee.name = path[i];
        obj.folders!.push(tempIntegrationTreee);
      }
      let index = obj.folders!.findIndex(x => x.name == path[i]);
      obj = obj.folders![index];
    }

    if (!obj.services) {
      obj.services = [];
    }

    let tempIntegrationService = new IntegrationServiceModel();
    tempIntegrationService.data = data;
    tempIntegrationService.name = path[path.length - 1];
    obj.services.push(tempIntegrationService);
  }
}