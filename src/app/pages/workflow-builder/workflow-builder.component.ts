import { Component, OnInit } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { IntegrationTree } from 'src/app/models/integration-tree.model';
import { IntegrationService } from 'src/app/services/integration.service';
import { take } from 'rxjs/operators';
import { Integration } from 'src/app/models/integration.model';

@Component({
  selector: 'app-workflow-builder',
  templateUrl: './workflow-builder.component.html',
  styleUrls: ['./workflow-builder.component.scss']
})
export class WorkflowBuilderComponent implements OnInit {
  toggleResize = false;
  treeControl!: NestedTreeControl<IntegrationTree>;
  data!: IntegrationTree;
  dataSource!: ArrayDataSource<IntegrationTree>;

  constructor(
    private integrationService: IntegrationService,
  ) { }

  ngOnInit(): void {
    this.treeControl = new NestedTreeControl<IntegrationTree>(node => node.branches);
    this.data = new IntegrationTree;
    this.data.root = '';
    this.integrationService.getAll().pipe(take(1)).subscribe(
      res => {
        this.integrationsToData(res);
        this.dataSource = new ArrayDataSource([this.data]);
        this.dataSource;
      }
    );
  }

  hasChild(_: number, node: IntegrationTree): boolean {
    return !!node.branches && node.branches.length > 0;
  }

  private integrationsToData(integrations: Integration[]): void {
    integrations.forEach(integration => {

      this.addToTr(this.data, integration.path.slice(1), integration)
    });
  }

  private addToTr(obj: IntegrationTree, pathInput: string, data: Integration): void {
    for (var i = 0, path: string[] = pathInput.split('/'), len = path.length; i < len; i++) {

      if (!obj.branches) {
        obj.branches = [];
      }
      if (!obj.branches!.some(x => x.root == path[i])) {
        let tempIntegrationTreee = new IntegrationTree();
        tempIntegrationTreee.root = path[i];
        obj.branches!.push(tempIntegrationTreee);
      }
      let index = obj.branches!.findIndex(x => x.root == path[i]);
      obj = obj.branches![index];
    }

    obj.data = data;
  }
}