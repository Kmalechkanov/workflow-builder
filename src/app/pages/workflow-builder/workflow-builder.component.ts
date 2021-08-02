import { Component, OnInit } from '@angular/core';
import { ArrayDataSource, DataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FlowTree } from 'src/app/models/flow-tree.model';
import { FlowService } from 'src/app/services/flow.service';
import { take } from 'rxjs/operators';
import { Flow } from 'src/app/models/flow.model';

@Component({
  selector: 'app-workflow-builder',
  templateUrl: './workflow-builder.component.html',
  styleUrls: ['./workflow-builder.component.scss']
})
export class WorkflowBuilderComponent implements OnInit {
  toggleResize = false;
  treeControl!: NestedTreeControl<FlowTree>;
  data!: FlowTree;
  dataSource!: ArrayDataSource<FlowTree>;


  constructor(
    private flowService: FlowService,
  ) { }

  ngOnInit(): void {
    this.treeControl = new NestedTreeControl<FlowTree>(node => node.branches);
    this.data = new FlowTree;
    this.data.root = '';
    this.flowService.getAll().pipe(take(1)).subscribe(
      res => {
        this.flowsToData(res);
        this.dataSource = new ArrayDataSource([this.data]);
        this.dataSource;
      }
    );
  }

  hasChild(_: number, node: FlowTree): boolean {
    return !!node.branches && node.branches.length > 0;
  }

  private flowsToData(flows: Flow[]): void {
    flows.forEach(flow => {

      this.addToTr(this.data, flow.path.slice(1), flow)
    })
    console.log(JSON.stringify(this.data))
  }

  private addToTr(obj: FlowTree, pathInput: string, data: Flow): void {
    for (var i = 0, path: string[] = pathInput.split('/'), len = path.length; i < len; i++) {

      if (!obj.branches) {
        obj.branches = [];
      }
      if (!obj.branches!.some(x => x.root == path[i])) {
        let tempFlowTreee = new FlowTree();
        tempFlowTreee.root = path[i];
        obj.branches!.push(tempFlowTreee);
      }
      let index = obj.branches!.findIndex(x => x.root == path[i]);
      obj = obj.branches![index];
    }

    obj.data = data;
  }
}