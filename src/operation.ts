type Edit = { skip: number } | { insert: string } | { delete: number };

export class Operation {
    private edits: Edit[];
  
    constructor(edits: Edit[]) {
      this.edits = edits;
    }
  
    combine(operation: Operation): void {
      const combinedEdits: Edit[] = [];
      let position1 = 0;
      let position2 = 0;
  
      while (position1 < this.edits.length && position2 < operation.edits.length) {
        const edit1 = this.edits[position1];
        const edit2 = operation.edits[position2];
  
        if ("skip" in edit1 && "skip" in edit2) {
          combinedEdits.push({ skip: edit1.skip + edit2.skip });
          position1++;
          position2++;
        } else if ("insert" in edit1 && "insert" in edit2) {
          combinedEdits.push(edit1);
          position1++;
          position2++;
        } else if ("delete" in edit1 && "delete" in edit2) {
          combinedEdits.push({ delete: edit1.delete + edit2.delete });
          position1++;
          position2++;
        } else if ("skip" in edit1) {
          combinedEdits.push(edit1);
          position1++;
        } else if ("skip" in edit2) {
          combinedEdits.push(edit2);
          position2++;
        } else if ("insert" in edit1) {
          combinedEdits.push(edit1);
          position1++;
        } else if ("insert" in edit2) {
          combinedEdits.push(edit2);
          position2++;
        } else if ("delete" in edit1) {
          combinedEdits.push(edit1);
          position1++;
        } else if ("delete" in edit2) {
          combinedEdits.push(edit2);
          position2++;
        }
      }
  
      while (position1 < this.edits.length) {
        combinedEdits.push(this.edits[position1]);
        position1++;
      }
  
      while (position2 < operation.edits.length) {
        combinedEdits.push(operation.edits[position2]);
        position2++;
      }
  
      this.edits = combinedEdits;
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