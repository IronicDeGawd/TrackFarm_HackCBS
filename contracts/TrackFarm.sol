// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TrackFarm {
    struct FarmerData {
        string cropType;
        string location;
        string fertiliser;
        uint256 harvestDate;
        uint256 quantity;
    }

    struct ProcessorData {
        string processType;
        uint256 processDate;
        uint256 quantityProcessed;
    }

    struct ManufacturerData {
        string productType;
        uint256 manufactureDate;
        uint256 quantityProduced;
    }

    struct DistributorData {
        string destination;
        uint256 dispatchDate;
        uint256 quantityDispatched;
    }

    struct ProductData {
        uint256 productId;
        FarmerData farmerData;
        ProcessorData processorData;
        ManufacturerData manufacturerData;
        DistributorData distributorData;
    }

    mapping(uint256 => ProductData) public products;

    event ProductAdded(uint256 productId, string message);
    event FarmerDataUpdated(uint256 productId, string message);
    event ProcessorDataUpdated(uint256 productId, string message);
    event ManufacturerDataUpdated(uint256 productId, string message);
    event DistributorDataUpdated(uint256 productId, string message);

    // Function to initialize a product with farmer data
    function addProduct(
        uint256 _productId,
        string memory _cropType,
        string memory _location,
        string memory _fertiliser,
        uint256 _harvestDate,
        uint256 _quantity
    ) public {
        require(products[_productId].productId == 0, "Product already exists");

        products[_productId] = ProductData({
            productId: _productId,
            farmerData: FarmerData(
                _cropType,
                _location,
                _fertiliser,
                _harvestDate,
                _quantity
            ),
            processorData: ProcessorData("", 0, 0),
            manufacturerData: ManufacturerData("", 0, 0),
            distributorData: DistributorData("", 0, 0)
        });

        emit ProductAdded(_productId, "Product created with FarmerData");
    }

    // Function for processor to add processing data
    function updateProcessorData(
        uint256 _productId,
        string memory _processType,
        uint256 _processDate,
        uint256 _quantityProcessed
    ) public {
        products[_productId].processorData = ProcessorData(
            _processType,
            _processDate,
            _quantityProcessed
        );
        emit ProcessorDataUpdated(_productId, "ProcessorData updated");
    }

    // Function for manufacturer to add manufacturing data
    function updateManufacturerData(
        uint256 _productId,
        string memory _productType,
        uint256 _manufactureDate,
        uint256 _quantityProduced
    ) public {
        products[_productId].manufacturerData = ManufacturerData(
            _productType,
            _manufactureDate,
            _quantityProduced
        );
        emit ManufacturerDataUpdated(_productId, "ManufacturerData updated");
    }

    // Function for distributor to add distribution data
    function updateDistributorData(
        uint256 _productId,
        string memory _destination,
        uint256 _dispatchDate,
        uint256 _quantityDispatched
    ) public {
        products[_productId].distributorData = DistributorData(
            _destination,
            _dispatchDate,
            _quantityDispatched
        );
        emit DistributorDataUpdated(_productId, "DistributorData updated");
    }

    // Retrieve full product data by product ID
    function getProductData(
        uint256 _productId
    ) public view returns (ProductData memory) {
        return products[_productId];
    }
}
