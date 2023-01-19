// Original file: proto/define.proto

import type * as grpc from '@grpc/grpc-js/build/src/index.js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AuthRequest as _protobuf_AuthRequest, AuthRequest__Output as _protobuf_AuthRequest__Output } from '../protobuf/AuthRequest';
import type { AuthResult as _protobuf_AuthResult, AuthResult__Output as _protobuf_AuthResult__Output } from '../protobuf/AuthResult';
import type { WorkerCommand as _protobuf_WorkerCommand, WorkerCommand__Output as _protobuf_WorkerCommand__Output } from '../protobuf/WorkerCommand';
import type { WorkerStatus as _protobuf_WorkerStatus, WorkerStatus__Output as _protobuf_WorkerStatus__Output } from '../protobuf/WorkerStatus';

export interface StreamServiceClient extends grpc.Client {
  Auth(argument: _protobuf_AuthRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_protobuf_AuthResult__Output>): grpc.ClientUnaryCall;
  Auth(argument: _protobuf_AuthRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_protobuf_AuthResult__Output>): grpc.ClientUnaryCall;
  Auth(argument: _protobuf_AuthRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_protobuf_AuthResult__Output>): grpc.ClientUnaryCall;
  Auth(argument: _protobuf_AuthRequest, callback: grpc.requestCallback<_protobuf_AuthResult__Output>): grpc.ClientUnaryCall;
  auth(argument: _protobuf_AuthRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_protobuf_AuthResult__Output>): grpc.ClientUnaryCall;
  auth(argument: _protobuf_AuthRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_protobuf_AuthResult__Output>): grpc.ClientUnaryCall;
  auth(argument: _protobuf_AuthRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_protobuf_AuthResult__Output>): grpc.ClientUnaryCall;
  auth(argument: _protobuf_AuthRequest, callback: grpc.requestCallback<_protobuf_AuthResult__Output>): grpc.ClientUnaryCall;
  
  StreamRequest(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_protobuf_WorkerStatus, _protobuf_WorkerCommand__Output>;
  StreamRequest(options?: grpc.CallOptions): grpc.ClientDuplexStream<_protobuf_WorkerStatus, _protobuf_WorkerCommand__Output>;
  streamRequest(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_protobuf_WorkerStatus, _protobuf_WorkerCommand__Output>;
  streamRequest(options?: grpc.CallOptions): grpc.ClientDuplexStream<_protobuf_WorkerStatus, _protobuf_WorkerCommand__Output>;
  
}

export interface StreamServiceHandlers extends grpc.UntypedServiceImplementation {
  Auth: grpc.handleUnaryCall<_protobuf_AuthRequest__Output, _protobuf_AuthResult>;
  
  StreamRequest: grpc.handleBidiStreamingCall<_protobuf_WorkerStatus__Output, _protobuf_WorkerCommand>;
  
}

export interface StreamServiceDefinition extends grpc.ServiceDefinition {
  Auth: MethodDefinition<_protobuf_AuthRequest, _protobuf_AuthResult, _protobuf_AuthRequest__Output, _protobuf_AuthResult__Output>
  StreamRequest: MethodDefinition<_protobuf_WorkerStatus, _protobuf_WorkerCommand, _protobuf_WorkerStatus__Output, _protobuf_WorkerCommand__Output>
}
