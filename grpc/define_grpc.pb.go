// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v3.21.1
// source: define.proto

package packet

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// StreamServiceClient is the client API for StreamService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type StreamServiceClient interface {
	StreamRequest(ctx context.Context, opts ...grpc.CallOption) (StreamService_StreamRequestClient, error)
}

type streamServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewStreamServiceClient(cc grpc.ClientConnInterface) StreamServiceClient {
	return &streamServiceClient{cc}
}

func (c *streamServiceClient) StreamRequest(ctx context.Context, opts ...grpc.CallOption) (StreamService_StreamRequestClient, error) {
	stream, err := c.cc.NewStream(ctx, &StreamService_ServiceDesc.Streams[0], "/protobuf.StreamService/StreamRequest", opts...)
	if err != nil {
		return nil, err
	}
	x := &streamServiceStreamRequestClient{stream}
	return x, nil
}

type StreamService_StreamRequestClient interface {
	Send(*UserRequest) error
	Recv() (*UserResponse, error)
	grpc.ClientStream
}

type streamServiceStreamRequestClient struct {
	grpc.ClientStream
}

func (x *streamServiceStreamRequestClient) Send(m *UserRequest) error {
	return x.ClientStream.SendMsg(m)
}

func (x *streamServiceStreamRequestClient) Recv() (*UserResponse, error) {
	m := new(UserResponse)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// StreamServiceServer is the server API for StreamService service.
// All implementations must embed UnimplementedStreamServiceServer
// for forward compatibility
type StreamServiceServer interface {
	StreamRequest(StreamService_StreamRequestServer) error
	mustEmbedUnimplementedStreamServiceServer()
}

// UnimplementedStreamServiceServer must be embedded to have forward compatible implementations.
type UnimplementedStreamServiceServer struct {
}

func (UnimplementedStreamServiceServer) StreamRequest(StreamService_StreamRequestServer) error {
	return status.Errorf(codes.Unimplemented, "method StreamRequest not implemented")
}
func (UnimplementedStreamServiceServer) mustEmbedUnimplementedStreamServiceServer() {}

// UnsafeStreamServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to StreamServiceServer will
// result in compilation errors.
type UnsafeStreamServiceServer interface {
	mustEmbedUnimplementedStreamServiceServer()
}

func RegisterStreamServiceServer(s grpc.ServiceRegistrar, srv StreamServiceServer) {
	s.RegisterService(&StreamService_ServiceDesc, srv)
}

func _StreamService_StreamRequest_Handler(srv interface{}, stream grpc.ServerStream) error {
	return srv.(StreamServiceServer).StreamRequest(&streamServiceStreamRequestServer{stream})
}

type StreamService_StreamRequestServer interface {
	Send(*UserResponse) error
	Recv() (*UserRequest, error)
	grpc.ServerStream
}

type streamServiceStreamRequestServer struct {
	grpc.ServerStream
}

func (x *streamServiceStreamRequestServer) Send(m *UserResponse) error {
	return x.ServerStream.SendMsg(m)
}

func (x *streamServiceStreamRequestServer) Recv() (*UserRequest, error) {
	m := new(UserRequest)
	if err := x.ServerStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// StreamService_ServiceDesc is the grpc.ServiceDesc for StreamService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var StreamService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "protobuf.StreamService",
	HandlerType: (*StreamServiceServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "StreamRequest",
			Handler:       _StreamService_StreamRequest_Handler,
			ServerStreams: true,
			ClientStreams: true,
		},
	},
	Metadata: "define.proto",
}
