import React from "react";
import { GridCell } from "@progress/kendo-react-grid";
import { Button } from "@progress/kendo-react-buttons";

export function MyCommandCell({ edit, add, update, confirm, discard, cancel }) {
  return class extends GridCell {
    render() {
      const { dataItem } = this.props;
      const inEdit = dataItem.inEdit;
      const isNewItem = dataItem.id === undefined;

      return inEdit ? (
        <td className="k-grid-content-sticky" style={{left: "0px", right: "0px", borderRightWidth: "1px"}}>
          <Button type="submit" primary={true} className="k-button k-grid-save-command" onClick={() => (isNewItem ? add() : update())}>
            {isNewItem ? "Add" : "Update"}
          </Button>
          <Button type="button" className="k-button k-grid-cancel-command" onClick={() => (isNewItem ? discard(dataItem) : cancel())}>
            {isNewItem ? "Discard" : "Cancel"}
          </Button>
        </td>
      ) : (
        <td className="k-grid-content-sticky" style={{left: "0px", right: "0px", borderRightWidth: "1px"}}>
          <Button type="button" primary={true} onClick={() => edit(dataItem)}>
            Edit
          </Button>
          <Button type="button" className="k-button k-grid-remove-command" onClick={() => confirm(dataItem)}>
            Remove
          </Button>
        </td>
      );
    }
  };
}
