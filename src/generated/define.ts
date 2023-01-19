import type * as grpc from '@grpc/grpc-js/build/src/index.js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { StreamServiceClient as _protobuf_StreamServiceClient, StreamServiceDefinition as _protobuf_StreamServiceDefinition } from './protobuf/StreamService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  protobuf: {
    AuthRequest: MessageTypeDefinition
    AuthResult: MessageTypeDefinition
    StreamService: SubtypeConstructor<typeof grpc.Client, _protobuf_StreamServiceClient> & { service: _protobuf_StreamServiceDefinition }
    WorkerCommand: MessageTypeDefinition
    WorkerStatus: MessageTypeDefinition
  }
}

