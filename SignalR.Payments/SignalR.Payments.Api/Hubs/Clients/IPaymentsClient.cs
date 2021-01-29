using System.Collections.Generic;
using System.Threading.Tasks;
using SignalR.Payments.Api.Models;

namespace SignalR.Payments.Api.Hubs.Clients
{
    public interface IPaymentsClient
    {
        Task UpdatePayments(IEnumerable<Payment> businesses);
    }
}