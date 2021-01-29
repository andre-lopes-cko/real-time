using Microsoft.AspNetCore.SignalR;
using SignalR.Payments.Api.Hubs.Clients;

namespace SignalR.Payments.Api.Hubs
{
    public class PaymentsHub : Hub<IPaymentsClient>
    {
    }
}