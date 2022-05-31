package com.blue.shop.mybatis.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import com.blue.shop.common.Bin;

public class VariantPo implements Serializable {
    private Long id;

    private String variantName;

    private BigDecimal price;

    private String image;

    private String color;

    private String size;

    private Integer quantity;

    private Long productId;

    private Byte isDeleted;

    private Date createdAt;

    private Date updatedAt;

    private static final long serialVersionUID = 1L;
    
    public VariantPo() {
		Date now = new Date();
		this.isDeleted = Bin.ACTIVE.getBin();
		this.createdAt = now;
		this.updatedAt = now;
	}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVariantName() {
        return variantName;
    }

    public void setVariantName(String variantName) {
        this.variantName = variantName == null ? null : variantName.trim();
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image == null ? null : image.trim();
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color == null ? null : color.trim();
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size == null ? null : size.trim();
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Byte getIsDeleted() {
        return isDeleted;
    }

    public void setIsDeleted(Byte isDeleted) {
        this.isDeleted = isDeleted;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", variantName=").append(variantName);
        sb.append(", price=").append(price);
        sb.append(", image=").append(image);
        sb.append(", color=").append(color);
        sb.append(", size=").append(size);
        sb.append(", quantity=").append(quantity);
        sb.append(", productId=").append(productId);
        sb.append(", isDeleted=").append(isDeleted);
        sb.append(", createdAt=").append(createdAt);
        sb.append(", updatedAt=").append(updatedAt);
        sb.append(", serialVersionUID=").append(serialVersionUID);
        sb.append("]");
        return sb.toString();
    }
}