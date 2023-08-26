using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineKupovina.Domain.Models
{
    public enum OrderState
    {
        created,
        in_progress,
        completed,
        canceled
    }
}
