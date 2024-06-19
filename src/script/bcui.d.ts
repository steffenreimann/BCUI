export type GanttLineItem = {
    FieldNo: string;
    FieldName: string;
    FieldCaption: string;
    FieldType: string;
    FieldValue: any;
    Show: boolean;
    StartEnd: string;
};
export type GanttLine = Array<GanttLineItem>;
export type GanttData = Array<GanttLine>;
