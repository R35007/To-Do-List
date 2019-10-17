import React, { Component } from "react";
import { ITask } from "../../models/task.model";
import { ExcelExport, ExcelExportColumn } from "@progress/kendo-react-excel-export";
import "./ExportToExcel.scss";

interface IProps {
  tasks: ITask[];
}

export class ExportToExcel extends Component<IProps, any> {
  exportRef!: ExcelExport | null;

  export = () => {
    this.exportRef && this.exportRef.save(this.props.tasks);
  };

  render() {
    return (
      <>
        <button type="button" title="Export Excel" className="download btn p-0" onClick={this.export}>
          <i className="fas fa-download" />
        </button>
        <ExcelExport fileName={new Date().toLocaleDateString()} ref={exporter => (this.exportRef = exporter)}>
          <ExcelExportColumn field="id" title="ID" locked={true} width={30} />
          <ExcelExportColumn field="name" title="Name" />
          <ExcelExportColumn field="description" title="Description" width={350} />
          <ExcelExportColumn field="priority" title="Priority" width={30} />
          <ExcelExportColumn field="openOn" title="Open On" />
          <ExcelExportColumn field="inProgressOn" title="In Progress On" />
          <ExcelExportColumn field="doneOn" title="Done On" />
          <ExcelExportColumn field="status" title="Status" />
        </ExcelExport>
      </>
    );
  }
}

export default ExportToExcel;
