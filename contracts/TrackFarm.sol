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
        string productId;
        FarmerData farmerData;
        ManufacturerData manufacturerData;
        DistributorData distributorData;
    }

    mapping(bytes32 => ProductData) public products;

    event ProductAdded(string productId, string message);
    event FarmerDataUpdated(string productId, string message);
    event ManufacturerDataUpdated(string productId, string message);
    event DistributorDataUpdated(string productId, string message);

    // Internal function to get a unique identifier for the product
    function getProductKey(
        string memory _productId
    ) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(_productId));
    }

    // Function to initialize a product with farmer data
    function addProduct(
        string memory _productId,
        string memory _cropType,
        string memory _location,
        string memory _fertiliser,
        uint256 _harvestDate,
        uint256 _quantity
    ) public {
        bytes32 productKey = getProductKey(_productId);
        require(
            bytes(products[productKey].productId).length == 0,
            "Product already exists"
        );

        products[productKey] = ProductData({
            productId: _productId,
            farmerData: FarmerData(
                _cropType,
                _location,
                _fertiliser,
                _harvestDate,
                _quantity
            ),
            manufacturerData: ManufacturerData("", 0, 0),
            distributorData: DistributorData("", 0, 0)
        });

        emit ProductAdded(_productId, "Product created with FarmerData");
    }

    // Function for manufacturer to add manufacturing data
    function updateManufacturerData(
        string memory _productId,
        string memory _productType,
        uint256 _manufactureDate,
        uint256 _quantityProduced
    ) public {
        bytes32 productKey = getProductKey(_productId);
        require(
            bytes(products[productKey].productId).length != 0,
            "Product does not exist"
        );

        products[productKey].manufacturerData = ManufacturerData(
            _productType,
            _manufactureDate,
            _quantityProduced
        );
        emit ManufacturerDataUpdated(_productId, "ManufacturerData updated");
    }

    // Function for distributor to add distribution data
    function updateDistributorData(
        string memory _productId,
        string memory _destination,
        uint256 _dispatchDate,
        uint256 _quantityDispatched
    ) public {
        bytes32 productKey = getProductKey(_productId);
        require(
            bytes(products[productKey].productId).length != 0,
            "Product does not exist"
        );

        products[productKey].distributorData = DistributorData(
            _destination,
            _dispatchDate,
            _quantityDispatched
        );
        emit DistributorDataUpdated(_productId, "DistributorData updated");
    }

    // Retrieve full product data by product ID
    function getProductData(
        string memory _productId
    ) public view returns (ProductData memory) {
        bytes32 productKey = getProductKey(_productId);
        require(
            bytes(products[productKey].productId).length != 0,
            "Product does not exist"
        );

        return products[productKey];
    }
}
