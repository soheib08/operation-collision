type Edit = { skip: number } | { insert: string } | { delete: number };

export class Operation {
    private edits: Edit[];
  
    constructor(edits: Edit[]) {
      this.edits = edits;
    }
  
    combine(operation: Operation): Operation {
      const combinedEdits = [...this.edits, ...operation.edits];
      return new Operation(combinedEdits);
    }
  
    static combine(op1: Operation, op2: Operation): Operation {
      const combinedEdits = [...op1.edits, ...op2.edits];
      return new Operation(combinedEdits);
    }
  
    apply(string: string): string {
      let result = string;
      let position = 0;
  
      for (const edit of this.edits) {
        if ("skip" in edit) {
          position += edit.skip;
        } else if ("insert" in edit) {
          result =
            result.slice(0, position) + edit.insert + result.slice(position);
          position += edit.insert.length;
        } else if ("delete" in edit) {
          result = result.slice(0, position) + result.slice(position + edit.delete);
        }
      }
  
      return result;
    }
  }
  