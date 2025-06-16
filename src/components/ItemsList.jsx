
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Checkbox,
  Button,
  Chip,
  Box,
  Grid,
  Avatar
} from '@mui/material';
import {
  Package,
  MapPin,
  User,
  Clock,
  CheckCircle2
} from 'lucide-react';

const ItemsList = ({
  items,
  selectedItems,
  onItemSelect,
  onCreatePOD
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'error';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'warning';
      case 'Assigned': return 'info';
      case 'In Transit': return 'secondary';
      case 'Delivered': return 'success';
      default: return 'default';
    }
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Package size={48} style={{ color: '#9e9e9e', marginBottom: 16 }} />
          <Typography color="textSecondary">
            No items found matching your search criteria.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Dispatch Items
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {items.length} items found • {selectedItems.length} selected
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="success"
          onClick={onCreatePOD}
          disabled={selectedItems.length === 0}
          startIcon={<CheckCircle2 size={16} />}
        >
          Create POD ({selectedItems.length})
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map((item) => (
          <Card key={item.id} sx={{ '&:hover': { boxShadow: 3 } }}>
            <CardHeader
              avatar={
                <Checkbox
                  checked={selectedItems.includes(item.id)}
                  onChange={(e) => onItemSelect(item.id, e.target.checked)}
                />
              }
              title={item.itemName}
              subheader={`ID: ${item.id}`}
              action={
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip
                    label={item.priority}
                    color={getPriorityColor(item.priority)}
                    size="small"
                  />
                  <Chip
                    label={item.status}
                    color={getStatusColor(item.status)}
                    size="small"
                  />
                </Box>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <User size={16} color="#666" />
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {item.customerName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Customer
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MapPin size={16} color="#666" />
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {item.destination}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Destination
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Package size={16} color="#666" />
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        Qty: {item.quantity} • {item.weight}kg
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Quantity & Weight
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Clock size={16} color="#666" />
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {item.createdDate}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Created Date
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ItemsList;
