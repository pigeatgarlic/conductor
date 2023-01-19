// Original file: proto/define.proto


export interface WorkerStatus {
  'Hostname'?: (string);
  'CPU'?: (string);
  'RAM'?: (string);
  'Bios'?: (string);
  'Gpu'?: (string)[];
  'Disk'?: (string)[];
  'Network'?: (string)[];
  'IP'?: (string);
  'PrivateIP'?: (string);
}

export interface WorkerStatus__Output {
  'Hostname': (string);
  'CPU': (string);
  'RAM': (string);
  'Bios': (string);
  'Gpu': (string)[];
  'Disk': (string)[];
  'Network': (string)[];
  'IP': (string);
  'PrivateIP': (string);
}
